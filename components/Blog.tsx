import { Avatar, Badge, Paper, Stack, Text, Title } from "@mantine/core";
import { Image } from '@mantine/core';
import Link from "next/link";
import styles from "../styles/blog.module.scss";
import { Divider } from '@mantine/core';
import CommentSection from "./CommentSection";

export default function Blog() {
    return (
        <Paper withBorder style={{ maxWidth: 1000 }} radius="md">
            <div>
                <Image withPlaceholder
                    src="https://images.unsplash.com/photo-1616161610000-1b1b1b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
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
                </div>
                <Title order={1} style={{ marginBottom: "0.5em", wordBreak: "break-word", marginTop: "0.5em" }}>
                    Title of the blogpost will go here
                </Title>
                <div className={styles.badgeContainer}>
                    <Badge size="lg">Web</Badge>
                    <Badge size="lg">Web</Badge>
                    <Badge size="lg">Web</Badge>
                    <Badge size="lg">Web</Badge>
                </div>
            </div>
            <div className={styles.container2}>
                <Text style={{ padding: "32px 64px" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptate nulla doloremque at! Deleniti eos dolorum, non expedita delectus provident explicabo velit aut rerum. Porro commodi fugiat nesciunt recusandae perferendis.
                    Minus ipsam libero eligendi maiores et iusto veniam nihil dolorum voluptatum, consequatur eum excepturi, dicta ipsum atque consequuntur tempore qui? Sed, labore dicta. Debitis nobis iure necessitatibus laudantium aperiam optio.
                    Dolore itaque aspernatur tempore est ab hic quibusdam porro? Ipsa aut distinctio cumque alias odio qui dolorem ipsum eius culpa nemo quidem tenetur molestias ab magni, doloremque blanditiis commodi perferendis?
                    Nisi magnam suscipit nesciunt. Corrupti labore culpa quibusdam fugit assumenda vitae cum autem illo provident qui, atque suscipit! Veniam labore est vero tempore fugiat eveniet minima consectetur suscipit. Deleniti, adipisci.
                    Nisi quis sequi dolores exercitationem alias, officiis dolore adipisci modi sapiente repellat optio perspiciatis, nostrum iusto et consequatur similique veritatis quia aliquid at, cupiditate explicabo vero architecto doloribus. Nobis, nemo.
                    Ducimus laborum, eos eaque nesciunt incidunt praesentium omnis repellendus delectus. Autem modi nulla expedita mollitia sunt veniam consectetur est corporis incidunt? Inventore recusandae quia distinctio, odio repellat ea dolores suscipit.
                </Text>
                <Divider my="md" />
                <CommentSection />
            </div>
        </Paper>
    )
}