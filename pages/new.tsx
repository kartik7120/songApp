import CreatePost from "@/components/CreatePost";
import { Badge, Collapse, Group, Paper, Table, Text, Title, Transition } from "@mantine/core";
import styles from "../styles/new.module.scss";
import { useRef, useEffect, useState, useReducer } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import CreatePostMarkDownTable from "@/components/CreatePostMarkDownTable";

export default function NewPost() {
    const firstRef = useRef<{ isFocused: boolean }>({ isFocused: false });
    const [focused, setFocused] = useState<boolean>(false);
    const [tagsFocused, setTagsFocused] = useState<boolean>(false);
    const [isEditorFocused, setEditorFocused] = useState<boolean>(false);
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <div className={styles.container}>
            <div className={styles.container2}>
                <CreatePost setEditorFocused={setEditorFocused} setTagsFocused={setTagsFocused} setInputFocused={setFocused} firstRef={firstRef} />
            </div>
            <div className={styles.container3}>
                <Transition keepMounted={true} mounted={focused} transition="fade" duration={300} timingFunction="ease">
                    {(styles) => (
                        <div style={styles} className="first_section">
                            <Title order={3}>Writing a Great Post Title</Title>
                            <Text component="p">
                                Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence.
                                <br />
                                Use keywords where appropriate to help ensure people can find your post by search.
                            </Text>
                        </div>
                    )}
                </Transition>

                <Transition keepMounted={true} mounted={tagsFocused} transition="fade" duration={300} timingFunction="ease">
                    {(styles) => (
                        <div style={styles} className="second_section">
                            <Title order={3}>Tagging Guidelines</Title>
                            <Text>
                                <Text>Tags help people find your post.</Text>
                                <br />
                                <Text> Think of tags as the topics or categories that best describe your post.</Text>
                                <br />
                                <Text> Add up to four comma-separated tags per post. Combine tags to reach the appropriate subcommunities.</Text>
                                <br />
                                <Text> Use existing tags whenever possible.Some tags, such as “help” or “healthydebate”, have special posting guidelines.</Text>
                            </Text>
                        </div>
                    )}
                </Transition>
                <Transition keepMounted={true} mounted={isEditorFocused} transition="fade" duration={300} timingFunction="ease">
                    {(styles) => (
                        <div style={styles} className="third_section">
                            <Title order={3}>Editor Basics</Title>
                            <Text>
                                <Text> Use Markdown to write and format posts.</Text>
                                <br />
                            </Text>
                            <Text component="span" onClick={toggle} style={{ cursor: "pointer" }}>
                                <Group align="center">
                                    {opened === false ? <IoMdArrowDropright style={{ alignSelf: "center" }} /> : <IoMdArrowDropdown />}
                                    <Text>
                                        Commonly used syntax
                                    </Text>
                                </Group>
                            </Text>
                            <Collapse in={opened}>
                                <CreatePostMarkDownTable />
                            </Collapse>
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    )
}