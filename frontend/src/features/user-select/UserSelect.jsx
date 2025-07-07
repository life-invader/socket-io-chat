/**
 * @file Фича выбора пользователя. Селект с блокировкой занятых пользователей.
 */

import React, { useState } from 'react';
import { joinUser } from '@shared/model/socket/userService';
import { userStore } from '@shared/model/store';
import './style.css';

/**
 * @typedef {Object} UserSelectProps
 * @property {(userName: string) => void} onSelect
 * @property {string[]} availableUsers
 */

/**
 * Селект для выбора пользователя
 * @param {UserSelectProps} props
 * @returns {JSX.Element}
 */
export function UserSelect() {
  const availableUsers = userStore.useUserStore(userStore.selectAvailableUsers);
  const setUser = userStore.useUserStore(userStore.selectSetUser);

  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  /**
   * Обработка выбора пользователя
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleChange(e) {
    setSelected(e.target.value);
    setError('');
    joinUser(e.target.value);
    setUser(e.target.value);
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
        {availableUsers.map((user) => (
          <option key={user} value={user.name}>
            {user}
          </option>
        ))}
      </select>

      {error && <div className="userSelect__error">{error}</div>}
    </div>
  );
}
