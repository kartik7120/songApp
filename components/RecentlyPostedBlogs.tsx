import { trpc } from "@/utils/trpc";
import PreviewBlog from "./PreviewBlog";
import styles from "../styles/PreviewPostedBlog.module.scss";

export default function PostedBlogs() {
    const { data, fetchNextPage, fetchPreviousPage } = trpc.post.fetchHomePageBlogs.useInfiniteQuery({
        limit: 10,
    }, {
        onSuccess(data) {
            console.log(`recentely posted = ${JSON.stringify(data)}`)
        },
    });

    return (
        <div className={styles.container}>
            {data?.pages.map((page, index) => (
                <div key={index} className={styles.container}>
                    {page.blogs.map((blog: any) => (
                        <PreviewBlog key={blog.id} blog={{ ...blog, id: blog.blogId, uid: blog.userId }} />
                    ))}
                </div>
            ))}
        </div>
    )
}