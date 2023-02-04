import { type NextPage } from "next";
import { useState } from "react";
import { motion } from "framer-motion";

import Card from "../../components/elements/Card";
import Layout from "../../components/layout";
import { api } from "../../utils/api";

export type Post = {
  id: string;
  title: string;
  body: string;
};

const PostsPage: NextPage = () => {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const { data } = api.posts.getAllPosts.useQuery(
    { limit, page },
    { refetchOnWindowFocus: true, keepPreviousData: true }
  );

  return (
    <Layout>
      <h2 className="text-3xl text-white">Posts</h2>
      <motion.ul layout className="grid grid-cols-6 gap-7">
        {data?.map((post) => (
          <motion.li
            layout
            exit={{ scale: 0 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.4,
            }}
            className="col-span-6 sm:col-span-3 lg:col-span-2"
            key={post.id}
          >
            <Card
              href={`/posts/${post.id}`}
              header={post.title}
              body={post.subtitle}
            />
          </motion.li>
        ))}
      </motion.ul>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => setLimit(limit + 2)}
      >
        Load more
      </button>
    </Layout>
  );
};

export default PostsPage;
