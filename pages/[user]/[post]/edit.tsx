import FullEditor from "@/components/FullEditor";
import { Editor } from "@tiptap/react";
import { useRef } from "react";
import { createContext, useEffect, useState } from "react";

export const Context = createContext<any | null>(null);

export default function EditPost() {
    const editor = useRef<Editor | null>(null);
    const [editorState, setEditorState] = useState<Editor | null>(null);

    useEffect(() => {
        if (editorState) {
            console.log(editorState.getHTML());
        }
    }, [editorState])

    return (
        <Context.Provider value={setEditorState}>
            <FullEditor />
        </Context.Provider>
    );
}