import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/main.css" />
      </Head>
      <body class="dark">
        <Component />
      </body>
    </>
  );
}
