import React from "react";
import { Counter } from "./Counter.jsx";
import { css } from "../../styled-system/css/css.mjs";

export default function Page() {
  return (
    <>
      <h1
        className={css({ font: "bold 2em sans-serif", marginBlock: "0.67em" })}
      >
        My Vike app
      </h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  );
}
