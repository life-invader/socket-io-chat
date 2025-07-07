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

export const selectUser = (store) => store.user;
export const selectAvailableUsers = (store) => store.availableUsers;
export const selectSetUser = (store) => store.setUser;
export const selectSetAvailableUsers = (store) => store.setAvailableUsers;
