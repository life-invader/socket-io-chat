/**
 * @file Zustand-слайс состояния приложения
 */

import { create } from 'zustand';

export const useAppStore = create((set) => ({
  appSate: 'home',
  setAppState: (appSate) => set({ appSate }),
}));

export const selectAppState = (store) => store.appSate;
export const selectSetAppState = (store) => store.setAppState;
