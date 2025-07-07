/**
 * @file Фича выбора пользователя. Селект с блокировкой занятых пользователей.
 */

import React, { useState } from 'react';
import { usersList } from '../../entities/user';
import { socket } from '../../shared/api/socket';
import './userSelect.css';

/**
 * @typedef {Object} UserSelectProps
 * @property {(userName: string) => void} onSelect
 */

/**
 * Селект для выбора пользователя
 * @param {UserSelectProps} props
 * @returns {JSX.Element}
 */
export function UserSelect({ onSelect, availableUsers }) {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  /**
   * Обработка выбора пользователя
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleChange(e) {
    setSelected(e.target.value);
    setError('');
    socket.emit('user:join', e.target.value);
    onSelect(e.target.value);
  }

  return (
    <div className="userSelect">
      <label className="userSelect__label" htmlFor="userSelect__select">
        Выберите пользователя:
      </label>

      <select
        id="userSelect__select"
        className="userSelect__select"
        value={selected}
        onChange={handleChange}>
        <option value="" disabled>
          -- Выберите --
        </option>
        {usersList.map((user) => (
          <option key={user.name} value={user.name} disabled={!availableUsers.includes(user.name)}>
            {user.name} {!availableUsers.includes(user.name) ? '(занят)' : ''}
          </option>
        ))}
      </select>

      {error && <div className="userSelect__error">{error}</div>}
    </div>
  );
}
