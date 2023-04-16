import { z } from "zod";
import { router, procedure } from "../trpc";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
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
            author: z.string().optional(),
            createdAt: z.date().optional(),
            profileImage: z.string().optional(),
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
                    const userDoc = await getDoc(doc(db, "users", post.userId));
                    return {
                        ...docSnap.data(),
                        id: docSnap.id,
                        userId: post.userId,
                        profileImage: userDoc.data()?.profileImage,
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
    checkSavePost: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
    })).output(z.boolean()).query(async ({ input }) => {
        try {
            const savePostId = query(collection(db, "users", input.userId, "saved"), where("postId", "==", input.postId));
            const querySnapshot = await getDocs(savePostId);
            return querySnapshot.size > 0;
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    checkReaction: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
        reactantId: z.string(),
    })).output(z.boolean()).query(async ({ input }) => {
        try {
            const docRef = doc(db, "users", input.userId, "blogs", input.postId);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists() === false) return false;
            const data = docSnap.data();

            if(data?.reactions === undefined) return false;
            for(let i = 0; i < data.reactions.length; i++) {
                if(data.reactions[i] === input.reactantId) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    removeSavePost: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
    })).mutation(async ({ input }) => {
        try {
            const q = query(collection(db, "users", input.userId, "saved"), where("postId", "==", input.postId));
            const docSnap = await getDocs(q);

            const docId = docSnap.docs[0].id;
            const docRef = doc(db, "users", input.userId, "saved", docId);
            await deleteDoc(docRef);

            const docRef2 = doc(db, "users", input.userId, "blogs", input.postId);
            await updateDoc(docRef2, {
                saves: increment(-1),
            });

            return "Post removed successfully";
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    removeReaction: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
        reactUserId: z.string(),
    })).mutation(async ({ input }) => {
        try {
            const docRef = doc(db, "users", input.userId, "blogs", input.postId);
            await updateDoc(docRef, {
                reactions: arrayRemove(input.reactUserId),
            });
            return "Reaction removed successfully";
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    addComments: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
        comment: z.string(),
        author_name:z.string(),
        author_image:z.string(),
    })).mutation(async ({ input }) => {
        try {
            const docRef = doc(db, "users", input.userId, "blogs", input.postId);
            const colRef = collection(db, "users", input.userId, "blogs", input.postId, "comments");
            await addDoc(colRef, {
                comment: input.comment,
                userId: input.userId,
                createdAt: new Date().getDate(),
                author_name:input.author_name,
                author_image:input.author_image,
            });

            return "Comment added successfully";
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Internal Server Error',
            });
        }
    }),
    getComments: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
    })).
        query(async ({ input }) => {
            try {
                const colRef = collection(db, "users", input.userId, "blogs", input.postId, "comments");
                const querySnapshot = await getDocs(colRef);
                const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as any[];
                return data;
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Internal Server Error',
                });
            }
        }),
    getUserInfo: procedure.input(z.object({
        userId: z.string(),
    })).
        query(async ({ input }) => {
            try {
                const docRef = doc(db, "users", input.userId);
                const docSnap = await getDoc(docRef);
                return docSnap.data();
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Internal Server Error',
                });
            }
        }),
    getNumberOfComments: procedure.input(z.object({
        userId: z.string(),
        postId: z.string(),
    })).
        query(async ({ input }) => {
            try {
                const colRef = collection(db, "users", input.userId, "blogs", input.postId, "comments");
                const querySnapshot = await getDocs(colRef);
                return querySnapshot.size;
            } catch (error) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Internal Server Error',
                });
            }
        }),
})

export default postRouter;