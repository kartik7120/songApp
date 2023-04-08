import { ActionIcon, Button, clsx, Group, Menu, Text, Tooltip } from "@mantine/core";
import { RiHeartAddLine } from "react-icons/ri";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { VscCopy } from "react-icons/vsc";
import { SlOptions } from "react-icons/sl";
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import styles from "../styles/sidepostmenu.module.scss";
import { trpc } from "@/utils/trpc";
import { auth } from "@/firebase";
import { Modal } from '@mantine/core';
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    isDraft?: boolean;
    postId: string;
    userId: string;
    reactionCount: number | undefined;
    scrollIntoView: () => void;
    bookmarkCount: number | undefined;
}

export default function SidePostMenu(props: Props) {

    const queryClient = useQueryClient();

    const { data, error, isError, isLoading, mutate, isSuccess } = trpc.post.addReactionToPost.useMutation({
        onSuccess(data, variables, context) {
            console.log("success");
        },
    });

    const savePostMutation = trpc.post.savePost.useMutation({
        onSuccess(data, variables, context) {
            console.log("success bookmarking post");
        },
    });

    const [opened, { open, close }] = useDisclosure(false);

    const user = auth.currentUser;
    const clipboard = useClipboard({ timeout: 500 });
    const router = useRouter();

    return (
        <>
            <Modal opened={opened} onClose={close} title="Log in to continue" withCloseButton>
                <Button type="button" mt={10} variant="filled" color="violet" fullWidth onClick={() => {
                    router.push('/entry?login=true');
                }}>
                    Log in
                </Button>
                <Button type="button" fullWidth mt={10} variant="subtle" color="violet" onClick={() => {
                    router.push('/entry');
                }}>
                    Sign up
                </Button>
            </Modal>
            <div className={styles.wrapper}>
                <aside className={styles.container}>
                    {!props.isDraft && <>
                        <Tooltip label="Add Reaction" transitionProps={{ transition: "pop", duration: 300 }} >
                            <ActionIcon size="xl" variant="transparent" className={styles.btnContainer} onClick={() => {
                                if (user === null) {
                                    open();
                                    return;
                                }
                                mutate({
                                    postId: props.postId,
                                    userId: props.userId,
                                    respondentId: user!.uid
                                })
                            }}>
                                <RiHeartAddLine size={30} className={clsx(styles.iconClass, styles.heartClass)} />
                                <Text component="span" >{props.reactionCount || 0}</Text>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Jump to comments" transitionProps={{ transition: "pop", duration: 300 }} >
                            <ActionIcon size="xl" variant="transparent" className={styles.btnContainer} onClick={() => {
                                props.scrollIntoView();
                            }}>
                                <FaRegCommentAlt size={30} id="comment" className={clsx(styles.iconClass, styles.commentClass)} />
                                <Text component="span" >0</Text>
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Save post" transitionProps={{ transition: "pop", duration: 300 }} >
                            <ActionIcon size="xl" variant="transparent" className={styles.btnContainer} onClick={() => {
                                if (user === null) {
                                    open();
                                    return;
                                }
                                savePostMutation.mutate({
                                    postId: `${props.postId}`,
                                    userId: `${user.uid}`
                                });
                            }}>
                                <BsBookmark size={30} id="save" className={clsx(styles.iconClass, styles.bookmarkClass)} />
                                <Text component="span" >{props.bookmarkCount || 0}</Text>
                            </ActionIcon>
                        </Tooltip>
                    </>}
                    <Menu shadow="md" position="right" withArrow={false} >
                        <Menu.Target>
                            <ActionIcon size="xl">
                                <SlOptions />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Group position="apart" onClick={() => {
                                    clipboard.copy(`${router.basePath}${router.asPath}`);
                                }}>
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
            </div>
        </>
    )
}