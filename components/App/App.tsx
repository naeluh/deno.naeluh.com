import { h } from "preact";

import type { ComponentChildren } from "preact";

type Props = {
  children: ComponentChildren;
};

const App = (props: Props) => (
  <>
    <a className={"skipNavigationLink"} href="#main-content">
      Skip to Main Content
    </a>
    <main id="main-content">{props.children}</main>
  </>
);

export default App;
