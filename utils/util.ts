import { Editor } from "@tiptap/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { DocumentData, DocumentReference, addDoc, collection, doc, updateDoc } from "firebase/firestore";
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

export function uploadBlogImage(image: File | null, uid: string) {
    return new Promise(async (resolve, reject) => {
        if (image === null) {
            resolve("Image is null");
        }
        const mountainRef = ref(storage, `${uid}/images/${image?.name}`);
        await uploadBytes(mountainRef, image!).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve(downloadURL);
            });
        }).catch((error) => {
            reject(error)
            console.log(error);
        })
    });
}

export function uploadBlog(uid: string, data: any, image: File | null) {
    return new Promise(async (resolve, reject) => {
        try {
            const imageUrl = await uploadBlogImage(image, uid);
            const docRef = await addDoc(collection(db, "users", uid, "blogs"), {
                title: data.title,
                tags: data.tags,
                body: data.body,
                blogImage: imageUrl === "Image us null" ? null : imageUrl,
            });
            resolve(docRef as DocumentReference<DocumentData>);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
}

export function uploadDraft(uid: string, data: any, image: File | null) {
    return new Promise(async (resolve, reject) => {
        try {
            const imageUrl = await uploadBlogImage(image, uid);
            const docRef = await addDoc(collection(db, "users", uid, "drafts"), {
                title: data.title,
                tags: data.tags,
                body: data.body,
                blogImage: imageUrl === "Image us null" ? null : imageUrl,
            });
            resolve(docRef as DocumentReference<DocumentData>);
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
}

export function uploadBlogChanges(uid: string, data: any, image: File | null | string, postId: string) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(`post id = ${postId}`);
            console.log(`blog data = ${JSON.stringify(data)}`);
            let imageUrl = "";
            if (typeof image === "string") {
                imageUrl = image;
            } else {
                imageUrl = await uploadBlogImage(image, uid) as string;
            }
            await updateDoc(doc(db, "users", uid, "blogs", postId), {
                title: data.title,
                tags: data.tags,
                body: data.body,
                blogImage: imageUrl === "Image us null" ? null : imageUrl,
            })
            resolve("Blog updated successfully");
        } catch (error) {
            reject(error);
            console.log(error);
        }
    });
}