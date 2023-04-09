import PreviewBlog from "@/components/PreviewBlog";
import UserStats from "@/components/UserStats";
import { auth } from "@/firebase";
import { trpc } from "@/utils/trpc";
import { Avatar, Paper, Text, Title } from "@mantine/core";
import Head from "next/head";
import styles from "../../styles/profileStyle.module.scss";

export default function Profile() {
    const user = auth.currentUser;
    const { data, error, isLoading, fetchStatus, isSuccess, isError } = trpc.getBlogs.useQuery({ uid: user?.uid as string || null });
    return <>
        <Head>
            <title>{user?.displayName}</title>
        </Head>
        <Paper p="md" shadow="md" withBorder>
            <div>
                <Avatar src={user && user?.photoURL} size="xl" radius="xl" />
                <Title order={1}>{user?.displayName}</Title>
                <Text>Bio of the user</Text>
            </div>
        </Paper>
        <div className={styles.container}>
            <div>
                <UserStats numPosts={data?.length || 0} numComments={0} />
            </div>
            <div className={styles.container2}>
                {data && data.map((blog: any) => (
                    <PreviewBlog key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    </>;
}
