import { Avatar, Badge, Paper, Text } from "@mantine/core";

export default function ListeningsPreview() {
    return (
        <Paper shadow="sm" p="md" withBorder>
            <Text size="xl" weight={500}>
                Listening Title
            </Text>
            <Text size="sm">
                Date
            </Text>
            <Badge color="blue" variant="outline" mt="sm">
                Category
            </Badge>
            <Text>
                Content of listenings
            </Text>
            <div>
                <Avatar src="https://avatars.githubusercontent.com/u/18677354?v=4" />
                <Text>Author name</Text>
            </div>
        </Paper>
    );
}