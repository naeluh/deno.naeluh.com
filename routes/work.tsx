import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, getPosts } from "../lib/api.ts";
import PostList from "../components/PostList/PostList.tsx";
interface Page {
  _id: string;
  Title: string;
  Description: string;
  Slug: string;
  createdAt: string;
  updatedAt: string;
  Link: string;
  Image: {
    url: string;
    ext: string;
    provider: string;
    size: string;
  };
}

interface Api {
  post: Page;
  posts: Page[];
}

export const handler: Handlers<Api | null> = {
  async GET(_, ctx) {
    const { slug } = ctx.params;
    const resp = await getPost(slug);
    const posts = await getPosts();
    if (!resp) {
      return ctx.render(null);
    }
    console.log(resp[0]);
    const post = resp[0];
    const data: Api = {
      post,
      posts,
    };
    return ctx.render(data);
  },
};

export default function Page({ data }: {
  data:
    | Api
    | null;
}) {
  if (!data) {
    return <h1>Page not found</h1>;
  }
  return (
    <>
      <Head>
        <title>Work</title>
        <meta name="title" content="Nick Hulea's Work and Projects" />
        <meta name="description" content="Nick Hulea's Work and Projects" />
      </Head>
      <h1>Work</h1>
      <PostList
        data={data.posts}
        title={data.post.Title || ""}
        preview={true}
      />
    </>
  );
}
