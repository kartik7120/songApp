import { z } from "zod";
import { router, procedure } from "../trpc";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, increment, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { TRPCError, inferRouterOutputs } from "@trpc/server";
import { appRouter } from "./_app";

type Post = inferRouterOutputs<typeof appRouter>["getBlogPost"];

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
    getSavePosts: procedure.input(z.object({
        userId: z.string().nullable(),
    })).output(z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            body: z.string(),
            tags: z.array(z.string()).optional(),
            isDraft: z.boolean().optional(),
            blogImage: z.string().optional(),
            userId: z.string(),
        })).nullable()).
        query(async ({ input }) => {

            if (input.userId === null) {
                return null;
            }

            try {
                const docRef = collection(db, "users", input.userId, "saved");
                const docSnap = await getDocs(docRef);
                const postArr = docSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as any[];
                const data = await Promise.all(postArr.map(async (post) => {
                    const docRef = doc(db, "users", post.userId, "blogs", post.postId);
                    const docSnap = await getDoc(docRef);
                    return {
                        ...docSnap.data(),
                        id: docSnap.id,
                        userId: post.userId,
                    }
                }));

                return data as any;
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Internal Server Error',
                });
            }
        }),
})

export default postRouter;