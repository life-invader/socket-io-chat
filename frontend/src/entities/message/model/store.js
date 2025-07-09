/**
 * @file Zustand-слайс для сообщений
 */

import { create } from 'zustand';

/**
 * @typedef {Object} Message
 * @property {string} user
 * @property {string} message
 * @property {string} time
 */

/**
 * @typedef {Object} MessageState
 * @property {Message[]} messages
 * @property {(msg: Message) => void} addMessage
 * @property {() => void} clearMessages
 */

export const useMessageStore = create((set) => ({
  // State
  messages: [],

  // Actions
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));

// State selectors
export const selectMessages = (store) => store.messages;

// Action selectors
export const selectAddMessage = (store) => store.addMessage;
export const selectClearMessages = (store) => store.clearMessages;
