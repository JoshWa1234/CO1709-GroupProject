import styles from "./ErrorMessage.module.css";
export default function ErrorMessage({message}){
    return (
        <span className={styles["error-text"]}>
            {message}
        </span>
    )
}
