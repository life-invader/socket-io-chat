/**
 * @file Фича чата в комнате. Отправка и отображение сообщений.
 */

import React, { useEffect, useRef, useState } from 'react';
import { useMessageStore } from '@shared/store/messageSlice';
import { subscribeMessages, sendMessage } from '@shared/services/messageService';
import './style.css';

/**
 * @typedef {Object} ChatProps
 * @property {string} user - Имя пользователя
 * @property {string} room - Название комнаты
 */

/**
 * Чат в комнате
 * @param {ChatProps} props
 * @returns {JSX.Element}
 */
export function Chat({ user, room }) {
  const messages = useMessageStore((s) => s.messages);
  const addMessage = useMessageStore((s) => s.addMessage);
  const clearMessages = useMessageStore((s) => s.clearMessages);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    clearMessages();
    const unsub = subscribeMessages(addMessage);

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, [room, addMessage, clearMessages]);

  /**
   * Отправка сообщения
   * @param {React.FormEvent} e
   */
  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(room, input);
    setInput('');
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.user === user ? 'chat__message chat__message--own' : 'chat__message'}>
            <span className="chat__user">{msg.user}:</span> {msg.message}
            <span className="chat__time">
              {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat__form" onSubmit={handleSend}>
        <input
          className="chat__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button className="chat__sendBtn" type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}
