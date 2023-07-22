import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Gradient from "../islands/Gradient/Gradient.tsx";
import App from "../components/App/App.tsx";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    return ctx.render(user);
  },
};

//  export default function Page({ data }: PageProps<User | null>) {
//   if (!data) {
//     return <h1>User not found</h1>;
//   }

//   return (
//         <><Gradient/></>
//     <div>
//       <img src={data.avatar_url} width={64} height={64} />
//       <h1>{data.name}</h1>
//       <p>{data.login}</p>
//     </div>

//   );
// }

export default function Home({ data }: PageProps<User | null>) {
  const count = useSignal(3);
  return (
    <App>
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
    </App>
  );
}
