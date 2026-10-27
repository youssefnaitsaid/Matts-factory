export const FILTERS = ['all', 'active', 'completed'];

export const DEFAULT_FILTER = 'all';

export function addTodo(todos, text) {
  const trimmed = String(text).trim();
  if (!trimmed) return todos;
  return [...todos, { id: crypto.randomUUID(), text: trimmed, done: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function activeCount(todos) {
  return todos.filter((todo) => !todo.done).length;
}

export function filterTodos(todos, filter) {
  if (filter === 'active') return todos.filter((todo) => !todo.done);
  if (filter === 'completed') return todos.filter((todo) => todo.done);
  return todos;
}

export function selectView(todos, filter) {
  return { visible: filterTodos(todos, filter), activeCount: activeCount(todos) };
}
