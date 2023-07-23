import Card from "../Card/Card.tsx";

import type { ComponentChildren } from "preact";

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

export default function Page(
  { data, title, preview }: {
    data: Page[] | null;
    title: string;
    preview: boolean;
  },
) {
  const previewClass = preview ? "previewList" : "";
  if (!data) {
    return <h1>Page not found</h1>;
  }
  return (
    <section className={[previewClass, "postList"].join(" ")}>
      <ul>
        {data &&
          data.map(
            (post: Page) => (
              <li key={post.Slug}>
                <Card data={post} title={post.Title} />
              </li>
            ),
          )}
      </ul>
    </section>
  );
}
