import { List, Paper, Stack, Text } from "@mantine/core";
import { FaRegComment } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";

interface Props {
    numPosts: number;
    numComments: number;
}

export default function UserStats(props: Props) {
    return (
        <Paper withBorder radius="md" p="md">
            <List spacing="sm" size="sm">
                <List.Item icon={<MdPostAdd />}>
                    <Text >{props.numPosts} posts published</Text>
                </List.Item>
                <List.Item icon={<FaRegComment />}>
                    <Text >{props.numComments} comments written</Text>
                </List.Item>
                <List.Item icon={<RiUserFollowLine/>}>
                    <Text >0 followers</Text>
                </List.Item>
            </List>
        </Paper>
    )
}