import { useEffect, useState } from "preact/hooks";

const links = [
  {
    href: "/",
    name: "127.0.0.1",
  },
  {
    href: "/work",
    name: "work",
  },
  {
    href: "/contact",
    name: "contact",
  },
  {
    href: "/about",
    name: "about",
  },
];

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleNav = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      if (isActive) {
        html.style.overflow = "hidden";
      } else {
        html.style.overflow = "";
      }
    }
  }, [isActive]);

  return (
    <header>
      <nav
        role="navigation"
        className={["nav", !isActive ? "hideOverlay" : ""].join(" ")}
      >
        <button
          role="button"
          onClick={toggleNav}
          aria-label={!isActive ? "navigation closed" : "navigation open"}
        />

        <div
          className={"overlay"}
          aria-label={!isActive ? "navigation closed" : "navigation open"}
        >
          <button
            role="button"
            aria-label="navigation close button"
            onClick={toggleNav}
            className={"close"}
          >
            <span>close</span>
          </button>
          <ul>
            {links.map(({ name, href }) => (
              <li key={name}>
                <a href={href} onClick={toggleNav}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
