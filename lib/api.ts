async function fetchAPI(
  query: string | string[],
  { variables }: { [key: string]: any } = {},
) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch("https://strapi.hulea.org/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPosts() {
  const data = await fetchAPI(
    `
  query {
    webs {
      _id
      Title
      Description
      Slug
      createdAt
      updatedAt
      Link
      Image {
        url
        ext
        provider
        size
      }
    }
  }
`,
  );
  return data?.webs;
}

export async function getPost(Slug: string) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    webs(where: $where) {
      _id
      Title
      Description
      Slug
      Link
      createdAt
      updatedAt
      Image {
        url
        ext
        provider
        size
      }
    }
  }
`,
    {
      variables: {
        where: {
          Slug,
        },
      },
    },
  );
  return data?.webs;
}

export async function getPage(page) {
  const data = await fetchAPI(
    `
  query PageByArg($where: JSON) {
    basics(where: { URL: $where }, limit: 1) {
      Title
      _id
      Image {
        url
        ext
        provider
        size
      }
      Body
      URL
      createdAt
      updatedAt
    }
  }
`,
    {
      variables: {
        where: page,
      },
    },
  );

  return data?.basics[0];
}
