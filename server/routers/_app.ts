import { generateRandomString } from "@/utils/util";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
    hello: procedure.
        input(z.string())
        .query(({ input }) => {
            return `hello ${input}`;
        }),
    login: procedure.input(z.object({
        response_type: z.string().startsWith("code"),
        client_id: z.string(),
        scope: z.string(),
        redirect_uri: z.string(),
    })).query(({ input, ctx }) => {

        const state = generateRandomString(16);
        ctx.res.redirect("https://accounts.spotify.com/authorize?" + JSON.stringify({
            ...input,
            state,
        }));
    }),
    callback: procedure.input(z.object({
        code: z.string(),
        state: z.string(),
    })).query(async ({ input, ctx }) => {
        const client_id = '4de79c018e8242fbbe08481a01821bda';
        const client_secret = '4f0ce72cc24c4764a6cc4c5b8adb545d';

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
            },
            form: {
                grant_type: 'client_credentials'
            },
            json: true
        };

        try {
            const query = await fetch('https://accounts.spotify.com/api/token', {
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=client_credentials',
                method: 'POST',
            });

            const result = await query.json();
            return result;

        } catch (error) {
            throw error;
        }
    }),
    getMusic: procedure.input(z.object({
        id: z.string(),
        token: z.string(),
    })).query(async ({ input }) => {
        try {
            const query = await fetch(`https://api.spotify.com/v1/tracks/${input.id}`, {
                headers: {
                    'Authorization': `Bearer ${input.token}`,
                    'Content-Type': 'application/json',
                }
            })

            const result = await query.json();
            if (result.href) {
                return result.href;
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    }),
})

export type AppRouter = typeof appRouter;