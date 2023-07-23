import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import Container from "../components/Container/Container.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/main.css" />
      </Head>
      <body class="dark">
        <Container>
          <Header />

          <Component />

          <Footer />
        </Container>
      </body>
    </>
  );
}
