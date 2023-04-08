import { z } from "zod";
import { router, procedure } from "../trpc";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
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
})

export default postRouter;