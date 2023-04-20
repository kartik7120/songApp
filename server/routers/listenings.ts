import { z } from "zod";
import { router, procedure } from "../trpc";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, startAt, limit, Timestamp } from "firebase/firestore";
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
            date: Timestamp.fromDate(new Date()),
            username,
            avatar
        });

        return docRef.id;
    }),
    getAllListenings: procedure.input(z.object({
        cursor: z.string().nullish(),
        limit: z.number(),
    })).query(async ({ input }) => {
        const { cursor, limit } = input;
        const colRef = collection(db, "listenings");
        const q = query(colRef, orderBy("date", "desc"));
        const docs = await getDocs(colRef);
        const listenings: any[] = [];
        docs.forEach((doc) => {
            listenings.push({ ...doc.data(), id: doc.id, date: doc.data().date.toDate().toDateString() });
        });
        return listenings;
    }),
    getPreviewListenings: procedure.input(z.object({
        limit: z.number(),
    })).query(async ({ input }) => {
        const { limit } = input;
        const colRef = collection(db, "listenings");
        const q = query(colRef, orderBy("date", "desc"));
        const docs = await getDocs(q);
        const listenings: any[] = [];
        docs.forEach((doc) => {
            listenings.push({ ...doc.data(), id: doc.id, date: doc.data().date.toDate().toDateString() });
        });
        return listenings.slice(0, limit);
    }),
});

export default listeningsRouter;