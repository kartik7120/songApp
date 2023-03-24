import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Image from '@tiptap/extension-image';
import { FocusEventHandler, useEffect } from 'react';
import { ActionIcon } from '@mantine/core';
import { BsCardImage } from 'react-icons/bs';

interface Props {
    onFocus?: FocusEventHandler<HTMLDivElement> | undefined,
}

export default function EditorFunction(props: Props) {
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
            props.onFocus && props.onFocus({} as any);
        }
    });

    return (<>
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
                    <RichTextEditor.Control title='Insert Image' onClick={() => console.log('Used to add image')}>
                        <ActionIcon>
                            <BsCardImage />
                        </ActionIcon>
                    </RichTextEditor.Control>
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content />
        </RichTextEditor>

        <button type="button" onClick={() => console.log(editor?.getHTML())}>Get Json</button>
    </>
    );
}