import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, getPosts } from "../../lib/api.ts";
import { render } from "$gfm";
import PostList from "../../components/PostList/PostList.tsx";

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
    const post = resp[0];
    const data: Api = {
      post,
      posts,
    };
    return ctx.render(data);
  },
};

export default function Page({ data, title }: {
  data:
    | Api
    | null;
  title: string;
}) {
  if (!data) {
    return <h1>Page not found</h1>;
  }
  return (
    <section>
      <Head>
        <title>{data.post.Title}</title>
        <meta name="title" content={data.post.Title} />
        <meta name="description" content={data.post.Description} />
      </Head>

      <div key={data.post._id}>
        <h1>{data.post.Title}</h1>
        {data.post?.Image?.url && (
          <div className={"imgInnerContainer"}>
            <img
              className={"imgContainer"}
              src={`https://strapi.hulea.org/${data?.post?.Image?.url}`}
              alt={data.post.Title}
            />
          </div>
        )}
        <div className={"innerContentContainer"}>
          {data.post.Description && (
            <div
              class="mt-8 markdown-body"
              dangerouslySetInnerHTML={{
                __html: render(data.post.Description),
              }}
            />
          )}
          <a className="dash-link" target="_blank" href={data.post.Link}>
            go to website {`>`}
          </a>
          {" "}
        </div>
      </div>
      <PostList
        data={data.posts}
        title={data.post.Title || ""}
        preview={true}
      />
    </section>
  );
}
