// https://vike.dev/Head

import React from "react";
import logoUrl from "../assets/logo.svg";

import { ColorSchemeScript } from "@mantine/core";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
      <ColorSchemeScript />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.PUBLIC_ENV__GOOGLE_ANALYTICS}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${import.meta.env.PUBLIC_ENV__GOOGLE_ANALYTICS}');`,
        }}
      ></script>
    </>
  );
}
