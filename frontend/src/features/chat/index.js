/**
 * @file Фича чата в комнате. Отправка и отображение сообщений.
 */

import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../shared/api/socket';
import './chat.css';

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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([]); // Очищаем чат при смене комнаты
    socket.on('message', handleMessage);
    return () => {
      socket.off('message', handleMessage);
    };
    // eslint-disable-next-line
  }, [room]);

  /**
   * Обработка входящего сообщения
   * @param {import('../../entities/message').Message} msg
   */
  function handleMessage(msg) {
    setMessages((prev) => [...prev, msg]);
  }

  /**
   * Отправка сообщения
   * @param {React.FormEvent} e
   */
  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit('message', { roomName: room, message: input });
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
