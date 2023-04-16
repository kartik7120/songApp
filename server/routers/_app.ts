import { z } from "zod";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import postRouter from "./post";
import userRouter from "./user";

export const appRouter = router({
    hello: procedure.
        input(z.string())
        .query(({ input }) => {
            return `hello ${input}`;
        }),
    getBlogPost: procedure.input(z.object({
        id: z.string(),
        uid: z.string(),
        isDraft: z.boolean().optional(),
    })).output(z.object({
        title: z.string(),
        body: z.string(),
        createdAt: z.string().optional(),
        blogImage: z.string().optional(),
        id: z.string().optional(),
        tags: z.array(z.string()).optional(),
        reactions: z.array(z.string()).optional(),
        saves: z.number().optional(),
    }))
        .query(async ({ input }) => {
            try {
                if (input.isDraft) {
                    const docRef = doc(db, "users", input.uid, "drafts", input.id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        return { ...docSnap.data(), id: input.id } as any;
                    }
                    else {
                        throw new TRPCError({
                            code: 'NOT_FOUND',
                            message: 'Not Found',
                        })
                    }
                }
                const docRef = doc(db, "users", input.uid, "blogs", input.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return { ...docSnap.data(), id: input.id } as any;
                }
                else {
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message: 'Not Found',
                    })
                }
            } catch (error) {
                if (error instanceof TRPCError) {
                    throw error;
                }
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Internal Server Error',
                });
            }
        }),
    getUser: procedure.input(z.object({
        uid: z.string(),
    })).query(async ({ input }) => {
        try {
            const docRef = doc(db, "users", input.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as any;
            }
            else {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Not Found',
                })
            }
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    getBlogs: procedure.input(z.object({
        uid: z.string().nullable(),
    })).query(async ({ input }) => {

        try {
            if (input.uid === null || input.uid === undefined)
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Bad Request',
                });
            const docRef = collection(db, "users", input.uid, "blogs");
            const docSnap = await getDocs(docRef);
            if (docSnap.size > 0) {
                return docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id, uid: input.uid })) as any;
            }
            else {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Not Found',
                })
            }
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    post: postRouter,
    user: userRouter
})

export type AppRouter = typeof appRouter;

// http://localhost:3000/c229WxKFTHOzuzMUN2dhiStf9sz1/owzAdifrvdX5ZTAyDP3y