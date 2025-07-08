/**
 * @file Фича выбора пользователя. Селект с блокировкой занятых пользователей.
 */

import { useState } from 'react';
import { selectSetUser, useUserStore } from '@entities/user';
import { appStore } from '@shared/model/store';
import { userService } from '@shared/model/socket';
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
export function SelectUser({ availableUsers }) {
  const setAppState = appStore.useAppStore(appStore.selectSetAppState);
  const setUser = useUserStore(selectSetUser);
  const [selected, setSelected] = useState('');

  /**
   * Обработка выбора пользователя
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  function handleChange(evt) {
    const { target } = evt;
    const value = target.value;

    setSelected(value);
    setUser(value);
    userService.joinUser(value);
    setAppState('room');
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
    </div>
  );
}
