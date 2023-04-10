import FullEditor from "@/components/FullEditor";
import { trpc } from "@/utils/trpc";
import { Editor } from "@tiptap/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef } from "react";
import { createContext, useEffect, useState } from "react";

export const Context = createContext<any | null>(null);

export default function EditPost() {
    const router = useRouter();
    const { user, post } = router.query;
    const [editorState, setEditorState] = useState<Editor | null>(null);
    const { data, isLoading, isError, error, isSuccess, } = trpc.getBlogPost.useQuery({
        id: post!! as string,
        uid: user!! as string,
        isDraft: false
    });

    useEffect(() => {
        if (editorState) {
            console.log(editorState.getHTML());
        }
    }, [editorState])

    return (
        <>
            <Head>
                <title>Edit post</title>
            </Head>
            <Context.Provider value={{ setEditorState, data, isEdit: true, isSuccess }}>
                <FullEditor />
            </Context.Provider>
        </>
    )
}