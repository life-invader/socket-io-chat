/**
 * @file Фича выбора пользователя. Селект с блокировкой занятых пользователей.
 */

import React, { useState } from 'react';
import { usersList } from '@entities/user';
import { useUserStore } from '@shared/store/userSlice';
import { joinUser } from '@shared/services/userService';
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
  const availableUsers = useUserStore((s) => s.availableUsers);
  const setUser = useUserStore((s) => s.setUser);
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
