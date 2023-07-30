import { getPosts } from "./api.ts";
import { readerFromStreamReader } from "https://deno.land/std@0.196.0/streams/mod.ts";
import { copy } from "https://deno.land/std@0.196.0/streams/copy.ts";
import {
  ImageMagick,
  IMagickImage,
  initialize,
  MagickFormat,
} from "https://deno.land/x/imagemagick_deno/mod.ts";

await initialize();
const downloadImage = async (url: string, filename: string) => {
  const res = await fetch(url);
  const rdr = res?.body?.getReader();
  if (rdr) {
    const r = readerFromStreamReader(rdr);

    const f = await Deno.open(`./static/${filename}`, {
      create: true,
      write: true,
    });
    await copy(r, f);
    f.close();

    const data: Uint8Array = await Deno.readFile(`./static/${filename}`);
    await ImageMagick.read(data, async (img: IMagickImage) => {
      await img.write(
        MagickFormat.Webp,
        (data: Uint8Array) => {
          Deno.writeFile(`./static/${filename}.webp`, data);
          console.log(`./static/${filename}.webp saved!!!`);
          return;
        },
      );
    });
  }
  return true;
};

export const getImages = async () => {
  const posts = await getPosts();

  return posts.map(async ({ Image }: {
    Image: {
      url: string;
    };
  }) => {
    const filename = Image.url.replace("/uploads/", "");
    return await downloadImage(
      `https://strapi.hulea.org${Image.url}`,
      filename,
    );
  });
};
