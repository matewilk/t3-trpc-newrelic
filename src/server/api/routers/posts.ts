import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

import { posts } from "../../data/posts";

export const postsRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const id = input?.id;
      return posts.find((post) => post.id === id);
    }),

  getAllPosts: publicProcedure
    .input(z.object({ limit: z.number(), page: z.number() }).optional())
    .query(({ input }) => {
      const limit = input?.limit || "4";
      const page = input?.page || "1";
      return posts.slice(
        (Number(page) - 1) * Number(limit),
        Number(page) * Number(limit)
      );
    }),
});
