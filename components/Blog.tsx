import { Avatar, Badge, Button, Paper, Text, Title } from "@mantine/core";
import { Image } from '@mantine/core';
import Link from "next/link";
import styles from "../styles/blog.module.scss";
import { Divider } from '@mantine/core';
import CommentSection from "./CommentSection";
import parse from 'html-react-parser';
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/routers/_app";
import { useRouter } from "next/router";
import { auth } from "@/firebase";

type Props = inferRouterOutputs<AppRouter>["getBlogPost"] & {
    targetRef: any;
    postId: string;
    userId: string;
};


export default function Blog(props: Props) {

    const router = useRouter();
    const { user, post } = router.query;
    const currentUser = auth.currentUser;
    return (
        <Paper withBorder style={{ maxWidth: 1000 }} radius="md">
            <div>
                <Image withPlaceholder
                    src={props.blogImage || null}
                    width={1000} height={420} alt="Mantine" />
            </div>
            <div className={styles.container}>
                <div className={styles.userInfo}>
                    <Avatar src={null} size="md" radius="lg" />
                    <div className={styles.userInfo2}>
                        <Link href="/[user]" as="/@mantine/first-post">
                            Username
                        </Link>
                        <Text>
                            Posted on Mar 29
                        </Text>
                    </div>
                    {currentUser && currentUser?.uid === user && <Button.Group style={{ marginRight: "auto" }}>
                        <Button variant="default" component="a" href={`/${user}/${post}/edit`}>Edit</Button>
                        <Button variant="default">Manage</Button>
                        <Button variant="default">States</Button>
                    </Button.Group>}
                </div>
                <Title order={1} style={{ marginBottom: "0.5em", wordBreak: "break-word", marginTop: "0.5em" }}>
                    {props.title}
                </Title>
                <div className={styles.badgeContainer}>
                    {props.tags && props.tags.map((tag, index) => (
                        <Badge key={index} size="lg" color="blue" variant="filled">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className={styles.container2}>
                <Text style={{ padding: "32px 64px" }}>
                    {parse(props.body)}
                </Text>
                <Divider my="md" />
                <CommentSection postId={props.postId} userId={props.userId} targetRef={props.targetRef} />
            </div>
        </Paper>
    )
}