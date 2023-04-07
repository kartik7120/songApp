import Blog from "@/components/Blog";
import SidePostMenu from "@/components/SidePostMenu";
import UserInfo from "@/components/UserInfo";
import styles from "../../../styles/postHome.module.scss";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

export default function BlogPost() {

    const router = useRouter();
    const { user, post } = router.query;
    const { data, isError, error, isLoading, isPaused } =
        trpc.getBlogPost.useQuery({ id: post as string, uid: user as string }, {
            enabled: !!user && !!post
        });

    if (isError) {
        return <div>{error.message}</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <SidePostMenu />
            <Blog blogImage={data.blogImage} body={data.body} title={data.title} tags={data.tags} id={data.id} />
            <UserInfo />
        </div>
    )
}