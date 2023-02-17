import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./AddTodo.module.css";

export default function AddTodo({ handleAdd }) {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //trim을 하고 난 이후로 유지가된다. 따라서 그 이후에 trim 메소드를 재호출 필요없다.
    if (text.trim() === "") return;
    handleAdd({ id: uuidv4(), text, status: "active" });
    // localStorage.todos= prev그 전에 기록
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className={styles.input}
      />
      <button className={styles.button}>Add</button>
    </form>
  );
}
