import { activeCount, addTodo, removeTodo, toggleTodo } from './todos.js';

const state = { todos: [] };

function render() {
  const list = document.querySelector('#list');
  list.replaceChildren(
    ...state.todos.map((todo) => {
      const item = document.createElement('li');
      item.className = todo.done ? 'done' : '';

      const label = document.createElement('label');
      const box = document.createElement('input');
      box.type = 'checkbox';
      box.checked = todo.done;
      box.addEventListener('change', () => {
        state.todos = toggleTodo(state.todos, todo.id);
        render();
      });
      const text = document.createElement('span');
      text.textContent = todo.text;
      label.append(box, text);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        state.todos = removeTodo(state.todos, todo.id);
        render();
      });

      item.append(label, remove);
      return item;
    }),
  );
  document.querySelector('#count').textContent = `${activeCount(state.todos)} active`;
}

document.querySelector('#form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#text');
  state.todos = addTodo(state.todos, input.value);
  input.value = '';
  render();
});

render();
