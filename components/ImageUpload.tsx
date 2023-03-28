import styles from "../styles/ImageUpload.module.scss";
import { ActionIcon, FileInput } from '@mantine/core';
import { BsCardImage } from "react-icons/bs";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addImage } from "@/utils/util";
import { Editor } from "@tiptap/react";

interface Form {
    image: FileList | null;
}

interface Props {
    field: any,
    editor: Editor | null;
}

export default function ImageUpload(props: Props) {

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, watch } = useForm<Form>({
        defaultValues: {
            image: null
        },
    });

    function handleClick() {
        if (hiddenFileInput.current)
            hiddenFileInput.current.click();
    }

    async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files);
        if (e.target.files) {
            try {
                let imageRef = ref(storage, "images/" + e.target.files[0].name);
                await uploadBytes(imageRef, e.target.files[0]).then((snapshot) => {
                    console.log(`full path = ${snapshot.ref.fullPath}`);
                    getDownloadURL(snapshot.ref).then((url) => {
                        console.log(`download url = ${url}`);
                        addImage(props.editor, url);
                    });
                    console.log('Uploaded a blob or file!');
                });
            } catch (error) {
                console.log(`error occured while uploading a file = ${error}`);
            }
        }
    }

    return <>
        <ActionIcon onClick={handleClick}>
            <BsCardImage />
        </ActionIcon>
        <label htmlFor="imageInput" className={styles.fileInput}>Image Upload</label>
        <input type="file" id="imageInput" ref={hiddenFileInput} onChange={handleOnChange}
            accept="image/*" className={styles.fileInput} />
    </>
}