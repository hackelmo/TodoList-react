import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(readTodosFromLocalStorage);
  const handleAdd = (todo) => {
    setTodos((todos) => [...todos, todo]);
  };

  const handleUpdate = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleDelete = (deleted) => {
    setTodos(todos.filter((t) => t.id !== deleted.id));
  };

  //ㅇ유즈이팩트? 7번줄 초기 initialState로 넣기?
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
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

const readTodosFromLocalStorage = () => {
  console.log("");
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

//useState는 인자로는 초기값을 전달한다
//컴포넌트가 불릴때마다 초기값인자를 호출한다
//따라서 localStrage로부터 값을 불러오거나 연산이 들어간 함수를 초기값으로 설정하면 매번 불러온다
//그러므로 콜백으로 주면 마운트될때만 한번 호출된다
//함수 자체를 넘긴거라서 useState내부적으로 가지고 있는상태가있다면 함수를 호출안한다
