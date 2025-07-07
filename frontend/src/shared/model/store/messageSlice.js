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
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
