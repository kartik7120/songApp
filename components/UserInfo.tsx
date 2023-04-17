import { Avatar, Button, Paper, Text } from "@mantine/core";
import styles from "../styles/userinfo.module.scss";
import { trpc } from "@/utils/trpc";
import { auth } from "@/firebase";

export default function UserInfo() {

    const user = auth.currentUser;
    const { data } = trpc.user.getUserInfo.useQuery({
        userUid: user?.uid!,
    });

    return (
        <div>
            <Paper withBorder radius="md" p="md" style={{ gridColumn: "3/-1", maxHeight: "min-content" }}>
                <div className={styles.container}>
                    <div className={styles.avatarDiv}>
                        <Avatar style={{ marginRight: "1em" }} radius="xl" src={null} size="lg" />
                        <Text style={{ marginTop: "0.8em" }} size="xl">Kartik Shukla</Text>
                    </div>
                    <Button variant="filled" size="md
                    " color="violet" fullWidth>Follow</Button>
                    <div>
                        {data && data.bio &&
                            <>  <Text>Bio</Text>
                                <Text>{data.bio}</Text>
                            </>}
                    </div>
                    <div>
                        {data && data.location && <>
                            <Text weight="bold">Location</Text>
                            <Text>{data.location}</Text>
                        </>}
                    </div>
                    <div>
                        {data && data.education && <>
                            <Text weight="bold">Education</Text>
                            <Text>{data.education}</Text>
                        </>}
                    </div>
                    <div>
                        {data && data.work && <>
                            <Text weight="bold">Work</Text>
                            <Text>{data.work}</Text>
                        </>}
                    </div>
                    {data && data.joined && <div>
                        <Text weight="bold">Joined</Text>
                        <Text>Some date</Text>
                    </div>}
                </div>
            </Paper>
        </div>
    );
}