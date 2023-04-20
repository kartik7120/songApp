import { Avatar, Badge, Paper, Text } from "@mantine/core";
import styles from "../styles/listings.module.scss";

interface Props {
    title: string;
    date: string;
    description: string;
    tags: string[];
    username: string;
    avatar: string;
    id: string;
}

export default function ListeningsPreview(props: Props) {
    return (
        <Paper shadow="sm" p="md" withBorder>
            <div className={styles.previewContainer} id={props.id}>
                <Text size="xl" weight={500}>
                    {props.title}
                </Text>
                <Text size="sm">
                    {props.date.toString()}
                </Text>
                <div className={styles.badgeContainer}>
                    {props.tags.map((tag, index) => (
                        <Badge color="blue" variant="outline" mt="sm" key={index}>
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Text>
                    {props.description}
                </Text>
                <div className={styles.avatarClass}>
                    <Avatar src={props.avatar || "https://avatars.githubusercontent.com/u/18677354?v=4"} />
                    <Text>{props.username}</Text>
                </div>
            </div>
        </Paper>
    );
}