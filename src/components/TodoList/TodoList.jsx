import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState([
    { id: 123, text: "Dream Coding", status: "active" },
    { id: 124, text: "Study Eng", status: "active" },
  ]);
  const handleAdd = (todo) => {
    setTodos((todos) => [...todos, todo]);
  };

  const handleUpdate = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = (deleted) => {
    setTodos(todos.filter((t) => t.id !== deleted.id));
  };

  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {/* 입력이 유효한지 안한지 등등 검사하는건 로직 따로 분리하고싶어서  */}
      <AddTodo handleAdd={handleAdd} />
    </section>
  );
}

const getFilteredItems = (todos, filter) => {
  if (filter === "all") return todos;
  return todos.filter((todo) => todo.status === filter);
};
