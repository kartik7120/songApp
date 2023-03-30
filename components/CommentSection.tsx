import { Avatar, Button, Group } from "@mantine/core";
import EditorCom from "./EditorComponent";
import styles from "../styles/comment.module.scss";

export default function CommentSection() {

    return (
        <div className={styles.container}>
            <Avatar src={"https://avatars.githubusercontent.com/u/25126241?v=4"} size="md" radius="xl" />
            <EditorCom />
        </div>
    )
}