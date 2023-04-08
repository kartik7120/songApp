import { Avatar, Badge, Button, Paper, Text } from "@mantine/core";
import { FaRegComment } from "react-icons/fa";
import styles from "../styles/PreviewBlog.module.scss";
import { auth } from "@/firebase";

interface Props {
    blog: {
        title: string;
        description: string;
        body: string;
        tags: string[];
        id: string
    }
};

export default function PreviewBlog({ blog }: Props) {
    const user = auth.currentUser;

    return (
        <Paper shadow="md" withBorder p="xl" component="a" href={`/${user!.uid}/${blog.id}`}>
            <div className={styles.container1}>
                <Avatar src={user?.photoURL || "https://avatars.githubusercontent.com/u/18677354?v=4"} size="md" radius="xl" />
                <Text size="xl">{user && user?.displayName}</Text>
            </div>
            <div className={styles.container2}>
                <Text mt={10} weight="bold" size='xl'>{blog.title}</Text>
                <div className={styles.badgeContainer}>
                    {blog.tags.map((tag, index) => (
                        <Badge color="red" size="lg" key={index}>{tag}</Badge>
                    ))}
                </div>
            </div>
            <Button mt={12} variant="subtle" leftIcon={<FaRegComment />}>Add comment</Button>
        </Paper>
    );
}