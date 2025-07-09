/**
 * @file Zustand-слайс для пользователя
 */

import { create } from 'zustand';

export const useUserStore = create((set) => ({
  // State
  user: '',
  availableUsers: [],

  // Actions
  setUser: (user) => set({ user }),
  setAvailableUsers: (availableUsers) => set({ availableUsers }),
}));

// State selectors
export const selectUser = (store) => store.user;
export const selectAvailableUsers = (store) => store.availableUsers;

// Action selectors
export const selectSetUser = (store) => store.setUser;
export const selectSetAvailableUsers = (store) => store.setAvailableUsers;
