/**
 * @file Zustand-слайс для комнат
 */

import { create } from 'zustand';

/**
 * @typedef {Object} RoomState
 * @property {string} room
 * @property {Object.<string, string[]>} rooms
 * @property {(room: string) => void} setRoom
 * @property {(rooms: Object.<string, string[]>) => void} setRooms
 */

export const useRoomStore = create((set) => ({
  // State
  room: '',
  rooms: {},

  // Actions
  setRoom: (room) => set({ room }),
  setRooms: (rooms) => set({ rooms }),
}));

// State selectors
export const selectRoom = (store) => store.room;
export const selectRooms = (store) => store.rooms;

// Action Selectors
export const selectSetRoom = (store) => store.setRoom;
export const selectSetRooms = (store) => store.setRooms;
