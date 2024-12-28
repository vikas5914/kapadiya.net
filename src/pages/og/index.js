export const prerender = false;

import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import { metaData } from "src/config";
import React from "react";

export default async function GET({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || metaData.title;

  const element = React.createElement(
    "div",
    {
      style: {
        fontSize: 40,
        color: "black",
        background: "white",
        width: "100%",
        height: "100%",
        padding: "50px 200px",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      },
    },
    title
  );

  return new ImageResponse(element, {
    width: 1200,
    height: 600,
  });
}
