import { z } from "zod";
import { router, procedure } from "../trpc";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const listeningsRouter = router({
    uploadListening: procedure.input(z.object({
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        userId: z.string(),
        username: z.string(),
        avatar: z.string(),
    })).mutation(async ({ input }) => {
        const { title, description, tags, userId, username, avatar } = input;
        const colRef = collection(db, "listenings");
        const docRef = await addDoc(colRef, {
            title,
            description,
            tags,
            userId,
            date: new Date(),
            username,
            avatar
        });

        return docRef.id;
    }),
    getAllListenings: procedure.query(async ({ input }) => {
        const colRef = collection(db, "listenings");
        const docs = await getDocs(colRef);

        const listenings: any[] = [];
        docs.forEach((doc) => {
            listenings.push(doc.data());
        });

        return listenings;
    }),
});

export default listeningsRouter;