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

const Card = (
  { data, title }: { data: Page | null; title: string },
) => {
  if (!data) {
    return <></>;
  }
  return (
    <a href={`/work/${data.Slug}`} className={"img"}>
      {data?.Image?.url && (
        <div>
          <img
            src={`https://strapi.hulea.org/${data?.Image?.url}`}
            alt={data.Title}
            className={"imageContainer"}
          />
        </div>
      )}
      {title === undefined ? <h4>{data.Title}</h4> : <h4>{data.Title}</h4>}
    </a>
  );
};

export default Card;
