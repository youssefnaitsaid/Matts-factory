import assert from 'node:assert/strict';
import test from 'node:test';

import {
  activeCount,
  addTodo,
  clearCompleted,
  DEFAULT_FILTER,
  FILTERS,
  filterTodos,
  hasCompleted,
  isEmptyResult,
  removeTodo,
  selectView,
  toggleTodo,
} from '../src/todos.js';

function sampleTodos() {
  const todos = addTodo(addTodo([], 'open task'), 'done task');
  return toggleTodo(todos, todos[1].id);
}

test('addTodo ignores blank text', () => {
  assert.equal(addTodo([], '   ').length, 0);
});

test('addTodo trims text and appends an open todo', () => {
  const todos = addTodo([], '  buy milk  ');
  assert.equal(todos.length, 1);
  assert.equal(todos[0].text, 'buy milk');
  assert.equal(todos[0].done, false);
});

test('toggleTodo flips only the target todo', () => {
  const todos = addTodo(addTodo([], 'one'), 'two');
  const toggled = toggleTodo(todos, todos[1].id);
  assert.equal(toggled[0].done, false);
  assert.equal(toggled[1].done, true);
});

test('removeTodo drops only the target todo', () => {
  const todos = addTodo(addTodo([], 'one'), 'two');
  const remaining = removeTodo(todos, todos[0].id);
  assert.deepEqual(
    remaining.map((todo) => todo.text),
    ['two'],
  );
});

test('activeCount counts open todos', () => {
  const todos = addTodo(addTodo([], 'one'), 'two');
  assert.equal(activeCount(todos), 2);
  assert.equal(activeCount(toggleTodo(todos, todos[0].id)), 1);
});

test('All shows every todo over a shared list', () => {
  const todos = sampleTodos();
  assert.deepEqual(
    filterTodos(todos, 'all').map((todo) => todo.text),
    ['open task', 'done task'],
  );
});

test('Active shows only open todos over a shared list', () => {
  const todos = sampleTodos();
  assert.deepEqual(
    filterTodos(todos, 'active').map((todo) => todo.text),
    ['open task'],
  );
});

test('Completed shows only done todos over a shared list', () => {
  const todos = sampleTodos();
  assert.deepEqual(
    filterTodos(todos, 'completed').map((todo) => todo.text),
    ['done task'],
  );
});

test('the app default filter is All and shows every todo', () => {
  const todos = sampleTodos();
  assert.equal(DEFAULT_FILTER, 'all');
  assert.deepEqual(FILTERS, ['all', 'active', 'completed']);
  assert.equal(filterTodos(todos, DEFAULT_FILTER).length, todos.length);
});

test('activeCount ignores the current filter', () => {
  const todos = sampleTodos();
  for (const filter of FILTERS) {
    assert.equal(selectView(todos, filter).activeCount, 1);
  }
  assert.equal(selectView(todos, 'active').visible.length, 1);
  assert.equal(selectView(todos, 'completed').visible.length, 1);
  assert.equal(selectView(todos, 'all').visible.length, 2);
});

test('adding a todo keeps the current filter applied', () => {
  const todos = addTodo(sampleTodos(), 'new task');
  assert.deepEqual(
    filterTodos(todos, 'active').map((todo) => todo.text),
    ['open task', 'new task'],
  );
  assert.deepEqual(
    filterTodos(todos, 'completed').map((todo) => todo.text),
    ['done task'],
  );
});

test('toggling a todo keeps the current filter applied', () => {
  const todos = sampleTodos();
  const toggled = toggleTodo(todos, todos[0].id);
  assert.deepEqual(
    filterTodos(toggled, 'active').map((todo) => todo.text),
    [],
  );
  assert.deepEqual(
    filterTodos(toggled, 'completed').map((todo) => todo.text),
    ['open task', 'done task'],
  );
});

test('removing a todo keeps the current filter applied', () => {
  const todos = sampleTodos();
  const remaining = removeTodo(todos, todos[1].id);
  assert.deepEqual(
    filterTodos(remaining, 'active').map((todo) => todo.text),
    ['open task'],
  );
  assert.deepEqual(
    filterTodos(remaining, 'completed').map((todo) => todo.text),
    [],
  );
});

test('an empty list is an empty result for every filter', () => {
  for (const filter of FILTERS) {
    assert.equal(isEmptyResult([], filter), true);
  }
});

test('Active is an empty result when no todo is open', () => {
  const todos = sampleTodos();
  assert.equal(isEmptyResult(todos, 'active'), false);
  assert.equal(isEmptyResult(toggleTodo(todos, todos[0].id), 'active'), true);
});

test('Completed is an empty result when no todo is done', () => {
  const todos = addTodo(addTodo([], 'one'), 'two');
  assert.equal(isEmptyResult(todos, 'completed'), true);
  assert.equal(isEmptyResult(sampleTodos(), 'completed'), false);
});

test('All is only empty when there are no todos at all', () => {
  assert.equal(isEmptyResult(sampleTodos(), 'all'), false);
  assert.equal(isEmptyResult([], 'all'), true);
});

test('clearCompleted removes every done todo and keeps open todos', () => {
  const todos = addTodo(sampleTodos(), 'kept open');
  const cleared = clearCompleted(todos);
  assert.deepEqual(
    cleared.map((todo) => todo.text),
    ['open task', 'kept open'],
  );
  assert.equal(cleared.some((todo) => todo.done), false);
});

test('clearCompleted leaves an all-open list unchanged', () => {
  const todos = addTodo(addTodo([], 'one'), 'two');
  assert.deepEqual(clearCompleted(todos), todos);
});

test('hasCompleted tracks whether any todo is done', () => {
  assert.equal(hasCompleted([]), false);
  assert.equal(hasCompleted(addTodo([], 'one')), false);
  assert.equal(hasCompleted(sampleTodos()), true);
});

test('clearing keeps the current filter applied and the count correct', () => {
  const todos = addTodo(sampleTodos(), 'kept open');
  const cleared = clearCompleted(todos);
  assert.deepEqual(
    filterTodos(cleared, 'completed').map((todo) => todo.text),
    [],
  );
  assert.deepEqual(
    filterTodos(cleared, 'active').map((todo) => todo.text),
    ['open task', 'kept open'],
  );
  assert.equal(activeCount(cleared), 2);
});
