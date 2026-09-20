import styles from "./Button.module.css";

function Button({ children, variant = "primary", type = "button", ...rest }) {
  return (
    <button type={type} className={`${styles.button} ${styles[variant]}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
