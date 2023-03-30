import { ActionIcon, clsx, Group, Menu, Text } from "@mantine/core";
import { RiHeartAddLine } from "react-icons/ri";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { VscCopy } from "react-icons/vsc";
import { SlOptions } from "react-icons/sl";
import styles from "../styles/sidepostmenu.module.scss";

export default function SidePostMenu() {
    return (
        <aside className={styles.container}>
            <ActionIcon size="xl" variant="transparent" className={styles.btnContainer}>
                <RiHeartAddLine size={30} className={clsx(styles.iconClass, styles.heartClass)} />
                <Text component="span" >0</Text>
            </ActionIcon>
            <ActionIcon size="xl" variant="transparent" className={styles.btnContainer}>
                <FaRegCommentAlt size={30} id="comment" className={clsx(styles.iconClass, styles.commentClass)} />
                <Text component="span" >0</Text>
            </ActionIcon>
            <ActionIcon size="xl" variant="transparent" className={styles.btnContainer}>
                <BsBookmark size={30} id="save" className={clsx(styles.iconClass, styles.bookmarkClass)} />
                <Text component="span" >0</Text>
            </ActionIcon>
            <Menu shadow="md" position="right" withArrow={false} >
                <Menu.Target>
                    <ActionIcon size="xl">
                        <SlOptions />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item>
                        <Group position="apart">
                            <Text>Copy link</Text>
                            <VscCopy />
                        </Group>
                    </Menu.Item>
                    <Menu.Item>Share on Twitter</Menu.Item>
                    <Menu.Item>Share on Facebook</Menu.Item>
                    <Menu.Item>Share on LinkedIn</Menu.Item>
                    <Menu.Item>Share on HackerNews</Menu.Item>
                    <Menu.Item>Share on Reddit</Menu.Item>
                    <Menu.Item>Share post via...</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </aside>
    )
}