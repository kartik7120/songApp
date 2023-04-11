import { Avatar, Paper, Text } from "@mantine/core";
import styles from "../styles/reading.module.scss";
import { trpc } from "@/utils/trpc";
import { auth } from "@/firebase";

export default function ReadingList() {
    const user = auth.currentUser;

    const { data, error, isError, isLoading, isSuccess } = trpc.post.getSavePosts.useQuery({ userId: user?.uid!! || null });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>

    return (
        <div>
            <Paper p="md" withBorder>
                <div className={styles.container}>
                    <div>
                        <Avatar src="https://pbs.twimg.com/profile_images/1361030000/IMG_0001_400x400.jpg" />
                    </div>
                    <div className={styles.container2}>
                        <div>
                            <Text size="xl" weight={700}>
                                Blog Title
                            </Text>
                        </div>
                        <div className={styles.container3}>
                            <Text size="md" weight={500}>
                                Blog Author
                            </Text>
                            <Text size="md" weight={500}>
                                Tags
                            </Text>
                            <Text>
                                Date
                            </Text>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
}