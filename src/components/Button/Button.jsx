import cn from 'clsx';
import styles from "./Button.module.scss";

const Button = (props) => {
  return <button onClick={() => props.click()} className={cn(styles.btn, props.isActive ? styles.active : '')}>{props.text}</button>;
};

export default Button;
