import { initTRPC } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

export const createContext = (opts: CreateNextContextOptions) => {
    return {
        headers: opts.req.headers,
        req: opts.req,
        res: opts.res,
    };
}

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const procedure = t.procedure;