import cn from "clsx";
import CheckMark from '../../imgs/checkmark.png';
import styles from "./Case.module.scss";

const Case = (props) => {
  return (
    <div onClick={() => {props.setCompleted(props.id)}} className={cn(styles.case, props.element.completed ? styles.completed : "")}>
      <div className={styles.sphere}>
        {props.element.completed ? <img src={CheckMark} /> : <div />}
      </div>
      <label className={styles.caseText}>{props.element.text}</label>
    </div>
  );
};

export default Case;
