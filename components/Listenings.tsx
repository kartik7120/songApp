import { Button, Paper, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function ListeningsComponent() {
    return (
        <Paper withBorder p="md" style={{ maxWidth: 1000 }} radius="md">
            <Title order={2}>
                Listenings
            </Title>
            <div>
                <Text weight="bold">
                    Coming soon!
                </Text>
            </div>
            <Link href={`/listenings`} style={{ textDecoration: "none" }}>
                <Button variant="subtle" color="violet" fullWidth>
                    Create Listening
                </Button>
            </Link>
        </Paper>
    )
}