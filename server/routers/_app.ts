import { z } from "zod";
import { procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const appRouter = router({
    hello: procedure.
        input(z.string())
        .query(({ input }) => {
            return `hello ${input}`;
        }),
    getBlogPost: procedure.input(z.object({
        id: z.string(),
        uid: z.string(),
    })).output(z.object({
        title: z.string(),
        body: z.string(),
        createdAt: z.string().optional(),
        blogImage: z.string().optional(),
        id: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }))
        .query(async ({ input }) => {
            try {
                const docRef = doc(db, "users", input.uid, "blogs", input.id);
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
})

export type AppRouter = typeof appRouter;

// http://localhost:3000/c229WxKFTHOzuzMUN2dhiStf9sz1/owzAdifrvdX5ZTAyDP3y