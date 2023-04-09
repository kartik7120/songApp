import { Avatar, Badge, Button, Paper, Text } from "@mantine/core";
import { FaRegComment } from "react-icons/fa";
import styles from "../styles/PreviewBlog.module.scss";
import { auth } from "@/firebase";
import Link from "next/link";

interface Props {
    blog: {
        title: string;
        description: string;
        body: string;
        tags: string[];
        id: string;
        uid: string;
    }
};

export default function PreviewBlog({ blog }: Props) {
    const user = auth.currentUser;

    return (
        <Paper shadow="md" withBorder p="xl" >
            <div className={styles.container1}>
                <Avatar src={user?.photoURL || "https://avatars.githubusercontent.com/u/18677354?v=4"} size="md" radius="xl" />
                <Text size="xl">{user && user?.displayName}</Text>
            </div>
            <div className={styles.container2}>
                <Text component="a" href={`/${user!.uid}/${blog.id}`} mt={10} weight="bold" size='xl'>{blog.title}</Text>
                <div className={styles.badgeContainer}>
                    {blog.tags.map((tag, index) => (
                        <Badge color="red" size="lg" key={index}>{tag}</Badge>
                    ))}
                </div>
            </div>
            <Link href={`/${blog.uid}/${blog.id}#commentSection`}>
                <Button mt={12} variant="subtle" leftIcon={<FaRegComment />}>
                    Add comment
                </Button>
            </Link>
        </Paper>
    );
}