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

    const { mutate, isSuccess: isMutationSuccess } = trpc.post.addComments.useMutation();
    const { data, isLoading, isSuccess, refetch } = trpc.post.getComments.useQuery({
        postId: props.postId,
        userId: props.userId,
    });

    if(isMutationSuccess) {
        refetch();
    }

    return (
        <>
            <div className={styles.commentWrapper}>
                <Text size="xl" weight="bold">Comments</Text>
                {isSuccess && data.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <Paper shadow="sm" p="md" radius="md" withBorder>
                                <Avatar src={comment.author_image} size="md" radius="xl" mb={10} />
                                <Text size="xl" weight="bold">{comment.author_name} {comment.createdAt}</Text>
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