import { trpc } from "@/utils/trpc";
import { Button, Divider, Paper, Text, Title, createStyles } from "@mantine/core";
import Link from "next/link";

const styles = createStyles((theme) => ({
    listContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: theme.spacing.md,
    },
    listItem: {
        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
            color: "blueviolet"
        },
    }
}));

export default function ListeningsComponent() {

    const { classes } = styles();

    const { data } = trpc.list.getPreviewListenings.useQuery({
        limit: 10,
    });

    return (
        <Paper withBorder p="md" style={{ maxWidth: 1000 }} radius="md">
            <div className={classes.listContainer}>
                {data?.map((listening) => (
                    <div key={listening.id}>
                        <Link href={`/listenings#${listening.id}`}
                            style={{ textDecoration: "none", color: "white" }} className={classes.listItem}>
                            <Text size="lg" weight="bold" mb="lg" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                                {listening.title}
                                <Divider style={{ width: "100%" }} />
                            </Text>
                        </Link>
                    </div>
                ))}
            </div>
            <Link href={`/listenings`} style={{ textDecoration: "none" }}>
                <Button variant="subtle" color="violet" fullWidth>
                    Create Listening
                </Button>
            </Link>
        </Paper>
    )
}