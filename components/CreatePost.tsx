import { Button, FileInput, Group, MultiSelect, Paper, TextInput } from "@mantine/core";
import { HiOutlineHashtag } from "react-icons/hi";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";
import { useMantineColorScheme } from "@mantine/core";
import { useState } from "react";
import styles from "../styles/post.module.scss";

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

export default function CreatePost(props: Props) {
    const tags = Array.from({ length: 10 }, (_, i) => ({
        value: `tag-${i}`,
        label: `Tag ${i}`,
    }));

    const [value, setValue] = useState<string | undefined>(undefined);

    const theme = useMantineColorScheme();

    function handleReset() {
        setValue(undefined);
    }

    return (
        <div className={styles.container}>
            <Paper shadow="md" p="md" withBorder>
                <FileInput pb="lg" placeholder="Upload a cover image" style={{ width: "12em" }} accept="image/jpeg image/png image/svg+xml image/webp" size="md" />
                <TextInput onFocus={() => {
                    props.setEditorFocused(false);
                    props.setTagsFocused(false);
                    props.setInputFocused(true);
                }} className={styles.inputClass} mb="lg" placeholder="New post title here..." variant="filled" withAsterisk size="xl" />
                <MultiSelect onFocus={() => {
                    props.setEditorFocused(false);
                    props.setInputFocused(false);
                    props.setTagsFocused(true);
                }} mb="lg" icon={<HiOutlineHashtag />} data={tags} placeholder="Add up to 4 tags" size="md"
                    clearable maxDropdownHeight={300} maxSelectedValues={4} transitionProps={{
                        duration: 150, transition: "pop-top-left"
                    }} />
                <div data-color-mode={theme.colorScheme}>
                    <div className="wmde-markdown-var"> </div>
                    <MDEditor value={value} onChange={setValue} previewOptions={{ rehypePlugins: [[rehypeSanitize]] }} onFocus={() => {
                        props.setTagsFocused(false);
                        props.setInputFocused(false);
                        props.setEditorFocused(true);
                    }} />
                </div>
                <Group spacing="md" align="center" mt="lg">
                    <Button variant="filled" radius="md" color="violet" size="md">Publish</Button>
                    <Button variant="subtle" radius="md" size="md">Save Draft</Button>
                    <Button variant="subtle" onClick={handleReset} radius="md" color="indigo" size="md">Revert New Changes</Button>
                </Group>
            </Paper>
        </div>
    );
}
