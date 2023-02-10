import {
  type NextPage,
  type GetServerSideProps,
  type GetServerSidePropsResult,
} from "next";

import Layout from "../../components/layout";
import { api } from "../../utils/api";

interface PostProps {
  id: string;
}

const Post: NextPage<PostProps> = ({ id }) => {
  const { data } = api.posts.getPostById.useQuery({ id });

  return (
    <Layout>
      <h2 className="text-3xl text-white">{data?.id}</h2>
      <h3 className="text-2xl text-white">{data?.title}</h3>
      <p className="text-white">{data?.body}</p>
    </Layout>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps<PostProps> = ({
  query,
}): Promise<GetServerSidePropsResult<PostProps>> => {
  const id = query.id as string;

  if (!id) {
    return new Promise((resolve) =>
      resolve({ props: { id: null as unknown as string } })
    );
  }

  return new Promise((resolve) => resolve({ props: { id } }));
};
