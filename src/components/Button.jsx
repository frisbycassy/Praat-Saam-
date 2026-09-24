import styles from "./Button.module.css";

function Button({ children, variant = "primary", type = "button", className = "", ...rest }) {
  return (
    <button type={type} className={`${styles.button} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
