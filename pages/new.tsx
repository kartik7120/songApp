import CreatePost from "@/components/CreatePost";
import { Badge, Collapse, Group, Paper, Table, Text, Title, Transition } from "@mantine/core";
import styles from "../styles/new.module.scss";
import { useRef, useEffect, useState, useReducer } from "react";
import { useDisclosure } from "@mantine/hooks";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";

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
            <div>
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
                            <Text component="p">
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
                                <Table>
                                    <tr>
                                        <th>
                                            Markdown
                                        </th>
                                        <th>
                                            Formatted Text
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                # Header
                                                <br />
                                                ...
                                                <br />
                                                ###### Header
                                            </pre>
                                        </td>
                                        <td>
                                            <pre>
                                                H1 Header
                                                <br />
                                                ...
                                                <br />
                                                H6 Header
                                            </pre>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                *italics*
                                                <br />
                                                or
                                                <br />
                                                _italics_
                                            </pre>
                                        </td>
                                        <td>
                                            <i>italics</i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                **bold**
                                            </pre>
                                        </td>
                                        <td>
                                            <strong>
                                                bold
                                            </strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                [Link](https://...)
                                            </pre>
                                        </td>
                                        <td>
                                            <a href="www.google.com">link</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                * item 1
                                                <br />
                                                * item 2
                                            </pre>
                                        </td>
                                        <td>
                                            item 1
                                            <br />
                                            item 2
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                1. item 1
                                                <br />
                                                2. item 2
                                            </pre>
                                        </td>
                                        <td>
                                            item 1
                                            <br />
                                            item 2
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                &gt; quoted text
                                            </pre>
                                        </td>
                                        <td>
                                            |  quoted text
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                `inline code`
                                            </pre>
                                        </td>
                                        <td>
                                            <Badge color="gray">Inline Code</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <pre>
                                                ```
                                                <br />
                                                code block
                                                <br />
                                                ```
                                            </pre>
                                        </td>
                                        <td>
                                            <div style={{
                                                background: "black", width: 150, height: 80,
                                                display: "flex", justifyContent: "center",
                                                alignItems: "center", borderRadius: "10px"
                                            }}>
                                                <code>code block</code>
                                            </div>
                                        </td>
                                    </tr>
                                </Table>
                            </Collapse>
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    )
}