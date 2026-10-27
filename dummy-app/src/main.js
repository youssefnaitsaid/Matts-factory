import {
  addTodo,
  DEFAULT_FILTER,
  isEmptyResult,
  removeTodo,
  selectView,
  toggleTodo,
} from './todos.js';

const state = { todos: [], filter: DEFAULT_FILTER };

const filterButtons = document.querySelectorAll('#filters [data-filter]');

function render() {
  const view = selectView(state.todos, state.filter);
  for (const button of filterButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === state.filter));
  }
  const list = document.querySelector('#list');
  list.replaceChildren(
    ...view.visible.map((todo) => {
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
  const isEmpty = isEmptyResult(state.todos, state.filter);
  list.hidden = isEmpty;
  document.querySelector('#empty').hidden = !isEmpty;
  document.querySelector('#count').textContent = `${view.activeCount} active`;
}

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    state.filter = button.dataset.filter;
    render();
  });
}

document.querySelector('#form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#text');
  state.todos = addTodo(state.todos, input.value);
  input.value = '';
  render();
});

render();
