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
  room: '',
  rooms: {},
  setRoom: (room) => set({ room }),
  setRooms: (rooms) => set({ rooms }),
}));

export const selectRoom = (store) => store.room;
export const selectRooms = (store) => store.rooms;
export const selectSetRoom = (store) => store.setRoom;
export const selectSetRooms = (store) => store.setRooms;
