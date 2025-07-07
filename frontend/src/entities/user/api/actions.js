/**
 * Получить список пользователей
 * @returns {Promise<string[]>}
 */
export async function fetchAvailableUsers() {
  const res = await fetch('http://localhost:4000/users');
  const data = await res.json();
  return data.users;
}
