/**
 * @file Zustand-слайс для пользователя
 */

import { create } from 'zustand';
import { fetchAvailableUsers } from '../api/actions';

export const useUserStore = create((set) => ({
  // State
  user: '',
  availableUsers: [],

  // Actions
  setUser: (user) => set({ user }),
  setAvailableUsers: (availableUsers) => set({ availableUsers }),

  // Async actions
  getAvailableUsers: async () => {
    const users = await fetchAvailableUsers();
    set({ availableUsers: users });
  },
}));

// State selectors
export const selectUser = (store) => store.user;
export const selectAvailableUsers = (store) => store.availableUsers;

// Action selectors
export const selectSetUser = (store) => store.setUser;
export const selectSetAvailableUsers = (store) => store.setAvailableUsers;

// Async actions selectors
export const selectGetAvailableUsers = (store) => store.getAvailableUsers;
