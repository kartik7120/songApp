import styles from "../styles/ImageUpload.module.scss";
import { ActionIcon, FileInput } from '@mantine/core';
import { BsCardImage } from "react-icons/bs";
import { useRef } from "react";

export default function ImageUpload() {

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    function handleClick() {

        if (hiddenFileInput.current)
            hiddenFileInput.current.click();
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files);
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