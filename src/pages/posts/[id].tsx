import { type NextPage } from "next";

import Layout from "../../components/layout";
import { api } from "../../utils/api";

interface PostProps {
  id: string;
}

const Post: NextPage<PostProps> = ({ id }) => {
  const { data } = api.posts.getPostById.useQuery({ id });

  return (
    <Layout>
      <h2 className="text-3xl text-white">{data?.title}</h2>
      <h3 className="text-2xl text-white">{data?.subtitle}</h3>
      <p className="text-white">{data?.content}</p>
    </Layout>
  );
};

export default Post;

Post.getInitialProps = ({ query }): PostProps => {
  return { id: query.id as string };
};
