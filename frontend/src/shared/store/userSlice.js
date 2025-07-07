/**
 * @file Zustand-слайс для пользователя
 */
import { create } from 'zustand';

/**
 * @typedef {Object} UserState
 * @property {string} user
 * @property {string[]} availableUsers
 * @property {(user: string) => void} setUser
 * @property {(users: string[]) => void} setAvailableUsers
 */

export const useUserStore = create((set) => ({
  user: '',
  availableUsers: [],
  setUser: (user) => set({ user }),
  setAvailableUsers: (availableUsers) => set({ availableUsers }),
}));
