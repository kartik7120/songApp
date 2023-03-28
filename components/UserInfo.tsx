import { Avatar, Button, Paper, Text } from "@mantine/core";
import styles from "../styles/userinfo.module.scss";

export default function UserInfo() {
    return (
        <Paper withBorder radius="md" p="md">
            <div className={styles.container}>
                <div className={styles.avatarDiv}>
                    <Avatar style={{ marginRight: "1em" }} radius="xl" src={null} size="lg" />
                    <Text style={{ marginTop: "0.8em" }} size="xl">Kartik Shukla</Text>
                </div>
                <Button variant="filled" size="xl" color="violet" fullWidth>Follow</Button>
                <Text>Some bio text</Text>
                <div>
                    <Text weight="bold">Location</Text>
                    <Text>Califonia</Text>
                </div>
                <div>
                    <Text weight="bold">Education</Text>
                    <Text>Some college name</Text>
                </div>
                <div>
                    <Text weight="bold">Work</Text>
                    <Text>Some company name</Text>
                </div>
                <div>
                    <Text weight="bold">Joined</Text>
                    <Text>Some date</Text>
                </div>
            </div>
        </Paper>
    );
}