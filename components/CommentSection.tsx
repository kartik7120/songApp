import { Avatar, Button, Group } from "@mantine/core";
import EditorCom from "./EditorComponent";
import styles from "../styles/comment.module.scss";

interface Props {
    targetRef: any
}

export default function CommentSection(props:Props) {

    return (
        <div className={styles.container} ref={props.targetRef}>
            <Avatar src={"https://avatars.githubusercontent.com/u/25126241?v=4"} size="md" radius="xl" />
            <EditorCom />
        </div>
    )
}