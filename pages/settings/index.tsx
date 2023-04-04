import { Button, List, Tabs, Text } from "@mantine/core"
import { FcSettings } from "react-icons/fc";
import { ImSmile2 } from "react-icons/im";
import { GiMailbox } from "react-icons/gi";
import { BiLeaf } from "react-icons/bi";
import Profile from "@/components/Profile";
import styles from "../../styles/settings.module.scss";

export default function Settings() {
    return (
        <div className={styles.wrapper}>
            <Tabs orientation="vertical">
                <Tabs.List>
                    <Tabs.Tab value="profile" icon={<ImSmile2 />}>
                        Profile
                    </Tabs.Tab>
                    <Tabs.Tab value="customization" icon={<FcSettings />}>Customization</Tabs.Tab>
                    <Tabs.Tab value="notifications" icon={<GiMailbox />}>Notifications</Tabs.Tab>
                    <Tabs.Tab value="account" icon={<BiLeaf />}>Account</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="profile">
                    <Profile />
                </Tabs.Panel>
                <Tabs.Panel value="customization">
                    <Text>Customization</Text>
                </Tabs.Panel>
                <Tabs.Panel value="notifications">
                    <Text>Notifications</Text>
                </Tabs.Panel>
                <Tabs.Panel value="account">
                    <Text>Account</Text>
                </Tabs.Panel>
            </Tabs>
        </div>
    );
}