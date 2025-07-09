/**
 * @file Фича чата в комнате. Отправка и отображение сообщений.
 */

import { useState } from 'react';
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
export function SendMessage({ onMessageSend }) {
  const [input, setInput] = useState('');

  const inputChangeHandler = (evt) => {
    setInput(evt.target.value);
  };

  /**
   * Отправка сообщения
   * @param {React.FormEvent} e
   */
  const handleSend = (evt) => {
    evt.preventDefault();
    if (!input.trim()) return;

    onMessageSend(input);
    setInput('');
  };

  return (
    <form className="sendMessage" onSubmit={handleSend}>
      <input
        className="sendMessage__input"
        value={input}
        onChange={inputChangeHandler}
        placeholder="Введите сообщение..."
      />

      <button className="sendMessage__sendBtn" type="submit">
        Отправить
      </button>
    </form>
  );
}
