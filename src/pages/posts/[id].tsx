import {
  type NextPage,
  type GetServerSideProps,
  type GetServerSidePropsResult,
} from "next";
import Image from "next/image";
import { motion } from "framer-motion";

import Layout from "../../components/layout";
import { api } from "../../utils/api";

interface PostProps {
  id: string;
}

const Post: NextPage<PostProps> = ({ id }) => {
  const { data } = api.posts.getPostById.useQuery({ id });

  return (
    <Layout>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <h2 className="pt-2 text-5xl font-extrabold tracking-tight text-white">
          Post{" "}
          <span className="text-[hsl(280,100%,70%)]">
            {/* // Simulate a 10% chance of a browser error */}
            {Math.random() <= 0.1 ? data!.id : data?.id}
          </span>
        </h2>
        <div className="flex flex-col items-start">
          <h3 className="py-6 text-3xl font-bold text-white">{data?.title}</h3>
          <p className="text-white">{data?.body}</p>
          <div className="flex w-full items-center justify-between pt-6">
            <div className="flex items-center space-x-4">
              <Image
                className="h-7 w-7 rounded-full bg-white/30"
                src="https://avatars.githubusercontent.com/u/6328360?s=96&v=4"
                width={28}
                height={28}
                alt="Mat Wilk avatar"
              />
              <span className="font-light text-white">Post Author</span>
            </div>
            <span className="text-sm text-gray-500">7 days ago</span>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps<PostProps> = ({
  query,
}): Promise<GetServerSidePropsResult<PostProps>> => {
  const id = query.id as string;

  // Simulate a 5% chance of a post not existing
  if (Math.random() <= 0.05) {
    return new Promise((resolve) =>
      resolve({ props: { id: null as unknown as string } })
    );
  }

  return new Promise((resolve) => resolve({ props: { id } }));
};
