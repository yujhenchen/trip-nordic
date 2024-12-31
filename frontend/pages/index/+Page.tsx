import React from "react";
import { Counter } from "./Counter.jsx";
import { TypographyH1 } from "@/components/typography/H1.jsx";

export default function Page() {
  return (
    <>
      <TypographyH1 text="Plan Your Next Nordic Adventure" />
      {/* This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul> */}
    </>
  );
}
