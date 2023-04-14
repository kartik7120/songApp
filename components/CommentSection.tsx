import { Avatar, Button, Group, Paper, Text } from "@mantine/core";
import EditorCom from "./EditorComponent";
import styles from "../styles/comment.module.scss";
import { trpc } from "@/utils/trpc";
import parse from "html-react-parser";

interface Props {
    targetRef: any,
    postId: string,
    userId: string,
}

export default function CommentSection(props: Props) {

    const { mutate } = trpc.post.addComments.useMutation();
    const { data, isLoading, isSuccess } = trpc.post.getComments.useQuery({
        postId: props.postId,
        userId: props.userId,
    });

    const { data: userData } = trpc.getUser.useQuery({
        uid: props.userId,
    });

    if (isSuccess) {
        console.log(`comments = ${JSON.stringify(data)}`);
    }

    return (
        <>
            <div className={styles.commentWrapper}>
                {isSuccess && data.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <Paper shadow="sm" p="md" radius="md" withBorder>
                                <Text size="xl" weight="bold">{comment.userId}</Text>
                                <Text size="md">{parse(comment.comment)}</Text>
                            </Paper>
                        </div>
                    )
                })}
            </div>
            <div className={styles.container} ref={props.targetRef} id="commentSection">
                <Avatar src={"https://avatars.githubusercontent.com/u/25126241?v=4"} size="md" radius="xl" />
                <EditorCom postId={props.postId} userId={props.userId} />
            </div>
        </>
    )
}