import assert from 'node:assert/strict';
import test from 'node:test';

import { activeCount, addTodo, removeTodo, toggleTodo } from '../src/todos.js';

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
