import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Case from "../Case/Case";
import styles from "./ToDoComponent.module.scss";

export const FILTER_ITEMS = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
};

const ToDoComponent = () => {
  const inp = useRef(null);
  const [cases, setCases] = useState([]);
  const [filter, setFilter] = useState(FILTER_ITEMS.ALL);
  function enterPresshandler(e) {
    if (inp.current.value.length > 55 || e.key !== "Enter") return;
    setCases((cases) => [
      ...cases,
      { text: inp.current.value, completed: false },
    ]);
  }
  function setCompleted(id) {
    setCases((prevState) =>
      prevState.map((item, i) => {
        if (i === id) return { ...item, completed: !item.completed };
        else return item;
      })
    );
  }
  function clearCompleted() {
    setCases((prevState) => prevState.filter(item => !item.completed));
  }
  useEffect(() => {
    inp.current.addEventListener("keypress", enterPresshandler);
    return () => {
      inp.current.removeEventListener("keypress", enterPresshandler);
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <input
        ref={inp}
        className={styles.input}
        placeholder="What needs to be done?"
      />
      <div className={styles.cases}>
        {cases.map((element, i) =>
          filter === FILTER_ITEMS.ALL ? (
            <Case
              key={i}
              id={i}
              element={element}
              setCompleted={(id) => setCompleted(id)}
            />
          ) : filter === FILTER_ITEMS.ACTIVE && !element.completed ? (
            <Case
              key={i}
              id={i}
              element={element}
              setCompleted={(id) => setCompleted(id)}
            />
          ) : filter === FILTER_ITEMS.COMPLETED && element.completed ? (
            <Case
              key={i}
              id={i}
              element={element}
              setCompleted={(id) => setCompleted(id)}
            />
          ) : (
            <div />
          )
        )}
      </div>
      <div className={styles.listInfo}>
        <label className={styles.casesCount}>{cases.length} items left</label>
        <label className={styles.filter}>
          <Button
            click={() => setFilter(FILTER_ITEMS.ALL)}
            isActive={filter === FILTER_ITEMS.ALL}
            text="All"
          />
          <Button
            click={() => setFilter(FILTER_ITEMS.ACTIVE)}
            isActive={filter === FILTER_ITEMS.ACTIVE}
            text="Active"
          />
          <Button
            click={() => setFilter(FILTER_ITEMS.COMPLETED)}
            isActive={filter === FILTER_ITEMS.COMPLETED}
            text="Completed"
          />
        </label>
        <Button click={clearCompleted} text="Clear completed" />
      </div>
    </div>
  );
};

export default ToDoComponent;
