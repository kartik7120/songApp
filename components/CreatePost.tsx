import { Button, FileInput, Group, Modal, MultiSelect, Paper, TextInput } from "@mantine/core";
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
import { BsUpload } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";

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

    const tags = Array.from({ length: 10 }, (_, i) => ({
        value: `tag-${i}`,
        label: `Tag ${i}`,
    }));

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
            <div className={styles.container}>
                <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
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
                        <Controller name="body" control={control} render={({ field }) => (
                            <MDEditor {...field} previewOptions={{ rehypePlugins: [[rehypeSanitize]] }} onFocus={() => {
                                props.setTagsFocused(false);
                                props.setInputFocused(false);
                                props.setEditorFocused(true);
                            }} />
                        )} />
                        <Group spacing="md" align="center" mt="lg">
                            <Button variant="filled" type="submit" radius="md" color="violet" size="md">Publish</Button>
                            <Button variant="subtle" radius="md" size="md">Save Draft</Button>
                            <Button variant="subtle" onClick={open} radius="md" color="indigo" size="md">Revert New Changes</Button>
                        </Group>
                    </Paper>
                </form>
            </div>
        </>
    );
}
