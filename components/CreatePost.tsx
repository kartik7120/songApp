import { Alert, Button, FileInput, Group, Input, Modal, MultiSelect, Paper, Text, TextInput } from "@mantine/core";
import { HiOutlineHashtag } from "react-icons/hi";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useMantineColorScheme } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/post.module.scss";
import { Controller, useFormState, useWatch } from "react-hook-form";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { BsCardImage, BsUpload } from "react-icons/bs";
import { useDisclosure } from "@mantine/hooks";
import { SegmentedControl } from '@mantine/core';
import { Editor, useEditor } from "@tiptap/react";
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import { RichTextEditor, Link } from '@mantine/tiptap';
import PreviewMarkdown from "./PreviewMarkdown";
import ImageUpload from "./ImageUpload";
import { CgDanger } from "react-icons/cg";
import { useRouter } from "next/router";
import { convertToString, uploadBlog, uploadBlogChanges, uploadDraft } from "@/utils/util";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { ErrorMessage } from '@hookform/error-message';
import { useContext, MutableRefObject, Dispatch } from "react";
import { Context } from "@/pages/[user]/[post]/edit";

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
    imageUpload: FileList | null;
    errorFeild: string;
}

Image.configure({
    allowBase64: true,
});


export default function CreatePost(props: Props) {

    const router = useRouter();
    const [body, setBody] = useState<string>("");
    const imageUrlRef = useRef<string>("");
    const user = auth.currentUser;
    const context = useContext(Context) as any;

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
        content: body !== "" ? body : '',
        autofocus: 'end',
        onFocus: () => {
            props.setEditorFocused(true);
            props.setInputFocused(false);
            props.setTagsFocused(false);
        },
    });


    const { control, formState: { errors, isDirty, isSubmitting, isValid, dirtyFields }, watch, handleSubmit, reset,
        setValue: setFormValue, clearErrors, getValues, setError } = useForm<FormValues>({
            defaultValues: {
                body: "",
                image_file: null,
                tags: [],
                title: "",
                imageUpload: null
            },
        });
    const { errors: errors2 } = useFormState({ control });

    useEffect(() => {
        if (context)
            context.setEditorState(editor);
    }, [context, editor])

    useEffect(() => {
        if (localStorage.getItem(router.route) && context && context.isEdit === false) {
            const data = JSON.parse(localStorage.getItem(router.route) as string);
            setFormValue("body", data.body);
            setFormValue("image_file", data.image_file);
            setFormValue("tags", data.tags);
            setFormValue("title", data.title);
            setFormValue("imageUpload", data.imageUpload);
            editor?.commands.setContent(data.body);
        }
        if (context && context.isEdit === true && context.isSuccess) {
            // setFormValue("body", context.data.body);
            // setFormValue("image_file", context.data.image_file);
            setFormValue("tags", context.data.tags);
            setFormValue("title", context.data.title);
            // setFormValue("imageUpload", context.data.imageUpload);
            editor?.commands.setContent(context.data.body);
        }
        return () => {
            localStorage.setItem(router.route, convertToString({ ...getValues(), body: editor && editor.getHTML() }));
        };
    }, [router.route, setFormValue, getValues, editor, context]);


    const tags = Array.from({ length: 10 }, (_, i) => ({
        value: `tag-${i}`,
        label: `Tag ${i}`,
    }));

    const [value, setValue] = useState('edit');
    const [opened, { open, close }] = useDisclosure(false);

    const theme = useMantineColorScheme();

    function handleReset() {
        localStorage.removeItem(router.route);
        reset();
    }

    async function handleSubmitDraft() {
        if (user) {
            try {
                const docRef = await uploadDraft(user.uid, {
                    title: getValues("title"),
                    tags: getValues("tags"),
                    body: editor && editor.getHTML(),
                }, getValues("image_file")) as any;
                router.push(`/${user.uid}/draft/${docRef.id}`);
            } catch (error) {
                setError("errorFeild", {
                    type: "manual",
                    message: `${error}`
                })
            }
        }
    }

    const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
        clearErrors();
        if (user) {
            try {
                const docRef = await uploadBlog(user.uid, {
                    title: data.title,
                    tags: data.tags,
                    body: editor && editor.getHTML(),
                    author: user.displayName,
                    author_id: user.uid,
                    profile_image: user.photoURL,
                }, data.image_file!) as any;
                console.log("Document written with ID: ", docRef.id);
                router.push(`/${user.uid}/${docRef.id}`);
            } catch (error) {
                console.error("Error adding document: ", error);
                setError("errorFeild", {
                    type: "manual",
                    message: `${error}`
                })
            }
        }
    }

    async function saveChanges() {
        if (user) {
            try {
                if (dirtyFields['image_file'] === false) {
                    await uploadBlogChanges(user.uid, {
                        title: getValues("title"),
                        tags: getValues("tags"),
                        body: editor && editor.getHTML(),
                    }, context.data.image_file, context.data.id);
                } else {
                    await uploadBlogChanges(user.uid, {
                        title: getValues("title"),
                        tags: getValues("tags"),
                        body: editor && editor.getHTML(),
                    }, getValues("image_file"), context.data.id);
                }
                router.push(`/${user.uid}/${context.data.id}`);
            } catch (error) {
                setError("errorFeild", {
                    type: "manual",
                    message: `${error}`
                });
            }
        }
    }

    const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
        console.log(`errors = ${JSON.stringify(errors)}`);
    }

    return (
        <div className={styles.wrapper}>
            <Modal opened={opened} centered onClose={close}
                title="Are you sure you want to revert to the previous save ?" withCloseButton>
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
            <SegmentedControl value={value} style={{ marginBottom: "2em" }} onChange={setValue} size="lg" data={
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
                        <Controller name="title" rules={{
                            required: true
                        }} control={control} render={({ field }) => (
                            <TextInput {...field} error={errors.title && "Please enter Title for the post"} onFocus={() => {
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
                        <RichTextEditor editor={editor}>
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
                                    <RichTextEditor.Control title='Insert Image' onClick={() => console.log('image uploaded')}>
                                        <Controller name="imageUpload" control={control} render={({ field }) => (
                                            <ImageUpload field={field} editor={editor} />
                                        )} />
                                    </RichTextEditor.Control>
                                </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                        </RichTextEditor>
                        <Group spacing="md" align="center" mt="lg">
                            {!context ? <Button loading={isSubmitting} disabled={!isValid} variant="filled"
                                type="submit" radius="md" color="violet" size="md">Publish</Button> :
                                <Button loading={isSubmitting} variant="filled"
                                    type="button" onClick={saveChanges} radius="md" color="violet" size="md">Save changes</Button>
                            }
                            {context && !context.isEdit && <Button disabled={isSubmitting} variant="subtle" radius="md" size="md"
                                onClick={handleSubmitDraft}>Save Draft</Button>}
                            {isDirty && <Button variant="subtle" onClick={open} radius="md" color="indigo"
                                size="md">Revert New Changes</Button>}
                        </Group>
                    </Paper>
                </form> : <div>
                    <Paper shadow="md" p="md" withBorder>
                        <PreviewMarkdown title={watch("title")} tags={watch("tags")}
                            body={editor && editor.getHTML()} />
                    </Paper>
                </div>}
                {Object.keys(errors).length > 0 &&
                    <Alert icon={<CgDanger />} color="red"
                        style={{ marginBottom: "2em", marginTop: "2em", display: "block" }} title="Bummer">
                        <p>There are some errors in your form. Please fix them before submitting.</p>
                        <ErrorMessage errors={errors} name="errorFeild" render={({ message }) => <Text weight="bold">{message}</Text>} />
                    </Alert>
                }
            </div>
        </div>
    );
}