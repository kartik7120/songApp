import { Editor } from "@tiptap/react";

export function addImage(editor: Editor | null, url: string) {

    if (editor === null) {
        return;
    }

    editor.chain().focus().setImage({ src: url }).run();
}

export function convertToString(value: any) {
    if (typeof value === 'string') {
        return value;
    }
    return JSON.stringify(value);
}