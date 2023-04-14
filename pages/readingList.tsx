import { Avatar, Badge, Paper, Text, Title } from "@mantine/core";
import styles from "../styles/reading.module.scss";
import { trpc } from "@/utils/trpc";
import { auth } from "@/firebase";
import Link from "next/link";

export default function ReadingList() {
    const user = auth.currentUser;

    const { data, error, isError, isLoading, isSuccess } = trpc.post.getSavePosts.useQuery({ userId: user?.uid!! || null });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>

    return (
        <div className={styles.wrapper}>
            <Title order={1} mb={15}>Reading List ({data && data?.length})</Title>
            {data && data.map((post) => (
                <Paper p="md" withBorder key={post.id} mb={25}>
                    <div className={styles.container}>
                        <div>
                            <Avatar src="https://pbs.twimg.com/profile_images/1361030000/IMG_0001_400x400.jpg" />
                        </div>
                        <div className={styles.container2}>
                            <div>
                                <Link href={`/${post.userId}/${post.id}`} style={{ textDecoration: "none", color: "unset" }}>
                                    <Text size="xl" weight={700}>
                                        {post.title}
                                    </Text>
                                </Link>
                            </div>
                            <div className={styles.container3}>
                                <Text size="md" weight={500}>
                                    {post.author}
                                </Text>
                                <Text size="md" weight={500}>
                                    {post.tags && post.tags.map((tag) => (
                                        <Badge mr={7} key={tag}>{tag}</Badge>
                                    ))}
                                </Text>
                                <Text>
                                    {/* {post.createdAt && post.createdAt.toDate()} */}
                                </Text>
                            </div>
                        </div>
                    </div>
                </Paper>
            ))}
        </div>
    );
}