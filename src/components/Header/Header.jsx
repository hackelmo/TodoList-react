import React from "react";
import styles from "./Header.module.css";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Header({ filters, filter, onFilterChange }) {
  const { toggleDarkMode, darkMode } = useDarkMode();
  return (
    <header className={styles.headers}>
      <button className={styles.button} onClick={toggleDarkMode}>
        {!darkMode && <BsFillMoonFill />}
        {darkMode && <BsFillSunFill />}
      </button>
      <ul className={styles.filters}>
        {filters.map((item, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                filter === item && styles.selected
              }`}
              onClick={() => onFilterChange(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
