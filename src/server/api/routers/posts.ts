import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

type JsonPost = {
  id: string;
  title: string;
  body: string;
};

export const postsRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const id = input?.id;

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      // Simulate random error
      if (Math.random() <= 0.05) throw new Error("Random getPostById error");
      return (await response.json()) as unknown as Promise<JsonPost>;
    }),

  getAllPosts: publicProcedure
    .input(z.object({ limit: z.number(), page: z.number() }).optional())
    .query(async ({ input }) => {
      const limit = input?.limit || "4";
      const page = input?.page || "1";

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
      );
      // Simulate random error
      if (Math.random() <= 0.05) throw new Error("Random getAllPosts error");
      return (await response.json()) as Promise<JsonPost[]>;
    }),
});
