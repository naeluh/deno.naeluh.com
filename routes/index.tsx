import { Head } from "$fresh/runtime.ts";
import Gradient from "../islands/Gradient/Gradient.tsx";

export default function Home() {
  return (
    <section className={"center"}>
      <div className={"innerCenter"}>
        <Head>
          <title>Nick Hulea</title>
          <meta name="title" content="Nick Hulea&#39;s Website!" />
          <meta name="description" content="Nick Hulea&#39;s Website!" />
        </Head>

        <h1>Welcome!</h1>

        <p>Hello you have arrived at the website of Nick Hulea !</p>

        <p>
          Samples of my work can be found{" "}
          <a href="/work">
            <span>here</span>
          </a>
          .
        </p>

        <p>
          If you would like to contact me or if you have any questions click
          {" "}
          <a href="/contact">here</a>.
        </p>
      </div>

      <Gradient />
    </section>
  );
}
