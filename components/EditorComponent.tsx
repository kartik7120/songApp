import { RichTextEditor } from "@mantine/tiptap";
import { Controller, useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import Highlight from '@tiptap/extension-highlight';
import { Link } from "@mantine/tiptap";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { convertToString } from "@/utils/util";
import { Button, Group, Paper, SegmentedControl, Text } from "@mantine/core";
import parse from 'html-react-parser';

interface EditorBody {
    body: string;
    imageUpload: FileList | null;
}

export default function EditorCom() {

    const { control, handleSubmit, reset,
        setValue: setFormValue, clearErrors, getValues } = useForm<EditorBody>({
            defaultValues: {
                body: "",
                imageUpload: null
            },
        });

    const router = useRouter();
    const [value, setValue] = useState('edit');
    const onSubmit: SubmitHandler<EditorBody> = (data) => {
        console.log(data);
    }

    const onError: SubmitErrorHandler<EditorBody> = (errors, e) => {
        console.log(errors);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Underline,
            TextAlign,
            Superscript,
            Subscript,
            Link,
            Image
        ],
    });

    useEffect(() => {
        if (localStorage.getItem(router.route)) {
            const data = JSON.parse(localStorage.getItem(router.route + "comment") as string);
            setFormValue("body", data.body);
        }
        return () => {
            localStorage.setItem(router.route + "comment", convertToString({ ...getValues(), body: editor && editor.getHTML() }));
        };
    }, [router.route, setFormValue, getValues, editor]);


    return (
        <div>
            <SegmentedControl disabled={editor?.isEmpty} value={value} style={{ marginBottom: "2em" }} onChange={setValue} size="lg" data={
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
            {value === "edit" ? <form onSubmit={handleSubmit(onSubmit, onError)}>
                <RichTextEditor editor={editor} placeholder="Add to the discussion">
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
            </form> : <div>
                <Paper shadow="md" p="md" withBorder >
                    <Text>
                        {editor && parse(editor.getHTML())}
                    </Text>
                </Paper>
            </div>}
            <Button mt={19} disabled={editor?.isEmpty} color="violet" variant="filled">Submit</Button>
        </div>
    );
}