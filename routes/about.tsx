import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPage } from "../lib/api.ts";
import Page from "../components/Page/Page.tsx";
interface BasicPage {
  _id: string;
  Title: string;
  Body: string;
  URL: string;
  createdAt: string;
  updatedAt: string;
  Image: {
    url: string;
    ext: string;
    provider: string;
    size: string;
  };
}

interface Api {
  post: Page;
}

export const handler: Handlers<Api | null> = {
  async GET(_, ctx) {
    const resp = await getPage("about");
    if (!resp) {
      return ctx.render(null);
    }
    const post = resp;
    const data: Api = {
      post,
    };
    return ctx.render(data);
  },
};

export default function About({ data }: {
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
        <title>About</title>
        <meta name="title" content="Nick Hulea's Work and Projects" />
        <meta name="description" content="Nick Hulea's Work and Projects" />
      </Head>
      <h1>Work</h1>
      <Page
        data={data.post}
      />
    </>
  );
}
