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
  const [page] = useState(1);
  const [pageSize] = useState(4);

  const { data } = api.posts.getAllPosts.useQuery(
    { limit, page },
    { refetchOnWindowFocus: true, keepPreviousData: true }
  );

  return (
    <Layout>
      <h2 className="pt-2 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Blog <span className="text-[hsl(280,100%,70%)]">Posts</span>
      </h2>
      <motion.ul layout className="grid grid-cols-6 gap-7">
        {data?.map((post, index) => (
          <motion.li
            layout
            exit={{ scale: 0 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.2 * (index % pageSize),
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            className="col-span-6"
            key={post.id}
          >
            <Card
              href={`/posts/${post.id}`}
              header={post.title}
              body={post.body}
            />
          </motion.li>
        ))}
      </motion.ul>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => setLimit(limit + pageSize)}
      >
        Load more
      </button>
    </Layout>
  );
};

export default PostsPage;
