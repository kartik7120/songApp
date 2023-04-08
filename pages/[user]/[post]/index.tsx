import Blog from "@/components/Blog";
import SidePostMenu from "@/components/SidePostMenu";
import UserInfo from "@/components/UserInfo";
import styles from "../../../styles/postHome.module.scss";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { useScrollIntoView } from "@mantine/hooks";

export default function BlogPost() {

    const router = useRouter();
    const { user, post } = router.query;
    const { data, isError, error, isLoading, isPaused } =
        trpc.getBlogPost.useQuery({ id: post as string, uid: user as string }, {
            enabled: !!user && !!post,
            queryKey: ["getBlogPost", { id: post as string, uid: user as string }],
        });

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();

    if (isError) {
        return <div>{error.message}</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <SidePostMenu scrollIntoView={scrollIntoView} postId={post as string} userId={user as string} reactionCount={data.reactions && data.reactions.length} />
            <Blog targetRef={targetRef} blogImage={data.blogImage} body={data.body} title={data.title} tags={data.tags} id={data.id} />
            <UserInfo />
        </div>
    )
}