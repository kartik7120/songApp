import { ActionIcon, Button, FileInput, Group, Modal, MultiSelect, Paper, TextInput } from "@mantine/core";
import { HiOutlineHashtag } from "react-icons/hi";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import { useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import styles from "../styles/post.module.scss";
import { Controller } from "react-hook-form";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { BsCardImage, BsUpload } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";
import { SegmentedControl } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import rehypeRaw from "rehype-raw";
import EditorFunction from "../components/Editor";
import { useEditor } from "@tiptap/react";
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import { RichTextEditor, Link } from '@mantine/tiptap';
import PreviewMarkdown from "./PreviewMarkdown";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

interface Props {
    firstRef: React.RefObject<{ isFocused: boolean }> | undefined,
    setInputFocused: React.Dispatch<React.SetStateAction<boolean>>,
    setTagsFocused: React.Dispatch<React.SetStateAction<boolean>>,
    setEditorFocused: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
    image_file: File | null;
    title: string;
    tags: string[];
    body: string;
}

export default function CreatePost(props: Props) {

    const { control, formState: { errors }, watch, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            body: "",
            image_file: null,
            tags: [],
            title: "",
        }
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Underline,
            TextAlign,
            Superscript,
            SubScript,
            Link,
            Image
        ],
        content: '<p>Hello <strong>World</strong>!</p>',
        autofocus: 'end',
        onFocus: () => {
            props.setEditorFocused(true);
            props.setInputFocused(false);
            props.setTagsFocused(false);
        },
    });

    const tags = Array.from({ length: 10 }, (_, i) => ({
        value: `tag-${i}`,
        label: `Tag ${i}`,
    }));

    const [value, setValue] = useState('edit');
    const [opened, { open, close }] = useDisclosure(false);

    const theme = useMantineColorScheme();

    function handleReset() {
        reset();
    }

    const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(`data = ${JSON.stringify(data)}`);
        console.log(`image_file = ${JSON.stringify(data.image_file)}`);
    }

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        console.log(`errors = ${JSON.stringify(errors)}`);
        console.log(`e = ${JSON.stringify(e)}`);
    }

    return (
        <>
            <Modal opened={opened} centered onClose={close} title="Are you sure you want to revert to the previous save ?" withCloseButton>
                <Group spacing="md" align="center" mt="lg">
                    <Button variant="filled" color="red" onClick={() => {
                        handleReset();
                        close();
                    }}>
                        Yes
                    </Button>
                    <Button variant="filled" color="blue" onClick={close}>No</Button>
                </Group>
            </Modal>
            <SegmentedControl value={value} onChange={setValue} size="lg" data={
                [
                    {
                        label: "Edit",
                        value: "edit"
                    }, {
                        label: "Preview",
                        value: "preview"
                    }
                ]
            }
            />
            <div className={styles.container}>
                {value === "edit" ? <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
                    <Paper shadow="md" p="md" withBorder>
                        <Controller name="image_file" control={control} render={({ field }) => (
                            <FileInput icon={<BsUpload />} {...field} pb="lg" placeholder="Upload a cover image"
                                style={{ width: "15em" }} accept="image/jpeg,image/png,image/svg+xml,image/webp" size="md" />
                        )} />
                        <Controller name="title" control={control} render={({ field }) => (
                            <TextInput {...field} onFocus={() => {
                                props.setEditorFocused(false);
                                props.setTagsFocused(false);
                                props.setInputFocused(true);
                            }} className={styles.inputClass} mb="lg"
                                placeholder="New post title here..."
                                variant="filled" withAsterisk size="xl" />
                        )} />
                        <Controller name="tags" control={control} render={({ field }) => (
                            <MultiSelect {...field} onFocus={() => {
                                props.setEditorFocused(false);
                                props.setInputFocused(false);
                                props.setTagsFocused(true);
                            }} mb="lg" icon={<HiOutlineHashtag />} data={tags} placeholder="Add up to 4 tags" size="md"
                                clearable maxDropdownHeight={300} maxSelectedValues={4} transitionProps={{
                                    duration: 150, transition: "pop-top-left"
                                }} />
                        )} />
                        <RichTextEditor editor={editor} >
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Bold />
                                    <RichTextEditor.Italic />
                                    <RichTextEditor.Underline />
                                    <RichTextEditor.Strikethrough />
                                    <RichTextEditor.ClearFormatting />
                                    <RichTextEditor.Highlight />
                                    <RichTextEditor.Code />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.H3 />
                                    <RichTextEditor.H4 />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Blockquote />
                                    <RichTextEditor.Hr />
                                    <RichTextEditor.BulletList />
                                    <RichTextEditor.OrderedList />
                                    <RichTextEditor.Subscript />
                                    <RichTextEditor.Superscript />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Link />
                                    <RichTextEditor.Unlink />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.AlignLeft />
                                    <RichTextEditor.AlignCenter />
                                    <RichTextEditor.AlignJustify />
                                    <RichTextEditor.AlignRight />
                                </RichTextEditor.ControlsGroup>

                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.Control title='Insert Image' onClick={() => console.log('Used to add image')}>
                                        <ActionIcon>
                                            <BsCardImage />
                                        </ActionIcon>
                                    </RichTextEditor.Control>
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                        </RichTextEditor>
                        <Group spacing="md" align="center" mt="lg">
                            <Button variant="filled" type="submit" radius="md" color="violet" size="md">Publish</Button>
                            <Button variant="subtle" radius="md" size="md">Save Draft</Button>
                            <Button variant="subtle" onClick={open} radius="md" color="indigo" size="md">Revert New Changes</Button>
                        </Group>
                    </Paper>
                </form> : <div>
                    <Paper shadow="md" p="md" withBorder>
                        <PreviewMarkdown title={watch("title")} tags={watch("tags")}
                            body={editor && editor.getHTML()} />
                    </Paper>
                </div>}
            </div>
        </>
    );
}