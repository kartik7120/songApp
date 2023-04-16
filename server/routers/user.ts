import { z } from "zod";
import { procedure, router } from "../trpc";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { TRPCError } from "@trpc/server";

const userRouter = router({
    uploadUserInfo: procedure.input(z.object({
        userUid: z.string(),
        name: z.string().min(2),
        email: z.string().email().optional(),
        username: z.string().min(2).optional(),
        websiteUrl: z.string().url().optional(),
        bio: z.string().optional(),
        location: z.string().optional(),
        work: z.string().optional(),
        education: z.string().optional(),
        brandingColor: z.string().optional().optional(),
    })).mutation(async ({ input }) => {
        try {
            const docRef = doc(db, "users", input.userUid);
            await setDoc(docRef, {
                name: input.name,
                email: input.email,
                username: input.username,
                websiteUrl: input.websiteUrl,
                bio: input.bio,
                location: input.location,
                work: input.work,
                education: input.education,
            }, {
                merge: true
            })
            return "successfully uploaded user info";
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            })
        }
    }),
    getUserInfo: procedure.input(z.object({
        userUid: z.string(),
    })).query(async ({ input }) => {
        try {
            const docRef = doc(db, "users", input.userUid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as any;
            } else {
                return null;
            }
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            })
        }
    }),
})

export default userRouter;