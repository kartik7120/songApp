import { z } from "zod";
import { router, procedure } from "../trpc";
import { addDoc, arrayUnion, collection, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { TRPCError } from "@trpc/server";

const postRouter = router({
    addReactionToPost: procedure.input(z.object({
        postId: z.string(),
        userId: z.string(),
        respondentId: z.string(),
    })).mutation(async ({ input }) => {
        try {
            const docRef = doc(db, "users", input.userId, "blogs", input.postId);
            const docSnap = await updateDoc(docRef, {
                reactions: arrayUnion(input.respondentId),
            });

            return "Reaction added successfully";
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    savePost: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
    })).mutation(async ({ input }) => {
        try {
            const docRef = collection(db, "users", input.userId, "saved");
            const docSnap = await addDoc(docRef, {
                postId: input.postId,
                userId: input.userId,
            });
            
            const docRef2 = doc(db, "users", input.userId, "blogs", input.postId);
            await updateDoc(docRef2, {
                saves: increment(1),
            });

            if (!docSnap) throw new Error("Post not saved");

            return "Post saved successfully";
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    updatePost: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
        title: z.string(),
        body: z.string(),
        tags: z.array(z.string()),
        isDraft: z.boolean(),
        imageUpload: z.string(),
    })).mutation(async ({ input }) => {
        try {
            const docRef = doc(db, "users", input.userId, "blogs", input.postId);
            const docSnap = await updateDoc(docRef, {
                title: input.title,
                body: input.body,
                tags: input.tags,
                isDraft: input.isDraft,
                blogImage: input.imageUpload,
            });

            return "Post updated successfully";
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
})

export default postRouter;