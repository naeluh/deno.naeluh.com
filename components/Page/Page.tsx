import { Head } from "$fresh/runtime.ts";
import { render } from "$gfm";

interface Page {
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
const Page = ({
  data,
}: { data: Page | null }) => {
  if (!data) {
    return <></>;
  }
  return (
    <section>
      <Head>
        <title>{data.Title}</title>
        <meta name="title" content={data.Title} />
        <meta name="description" content={data.Body} />
      </Head>
      <div key={data._id}>
        <h1>{data.Title}</h1>
        <div className="basicPage">
          {data.Body && (
            <div
              class="mt-8 markdown-body"
              dangerouslySetInnerHTML={{
                __html: render(data.Body),
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
