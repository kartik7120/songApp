import PreviewBlog from "@/components/PreviewBlog";
import { auth } from "@/firebase";
import { trpc } from "@/utils/trpc";
import { Avatar, Paper, Text, Title } from "@mantine/core";
import Head from "next/head";

export default function Profile() {
    const user = auth.currentUser;
    const { data, error, isLoading, } = trpc.getBlogs.useQuery({ uid: user?.uid as string || null })
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
        <PreviewBlog blog={{
            title: "Title",
            body: "Body",
            tags: ["tag1", "tag2", "tag3", "tags4"],
            description: "Description"
        }} />
    </>;
}
