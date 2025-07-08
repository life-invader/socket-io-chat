/**
 * @file Фича чата в комнате. Отправка и отображение сообщений.
 */

import { useState } from 'react';
import { sendMessage } from '@shared/model/socket/messageService';
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
export function SendMessage({ room }) {
  const [input, setInput] = useState('');

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

  return (
    <form className="sendMessage" onSubmit={handleSend}>
      <input
        className="sendMessage__input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите сообщение..."
      />

      <button className="sendMessage__sendBtn" type="submit">
        Отправить
      </button>
    </form>
  );
}
