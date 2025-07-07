/**
 * Получить список комнат через REST
 * @returns {Promise<Object<string, string[]>>}
 */
export async function fetchRooms() {
  const res = await fetch('http://localhost:4000/rooms');
  const data = await res.json();
  return data.rooms;
}