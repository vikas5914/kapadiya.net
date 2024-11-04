export const prerender = false;

import { ImageResponse } from "@vercel/og";
import React from "react";
import { metaData } from "src/config";

export async function GET({ request }) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || metaData.title;

  const html = {
    type: "div",
    props: {
      style: {
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        letterSpacing: "-.02em",
        fontWeight: 700,
        background: "white",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              left: 42,
              top: 42,
              position: "absolute",
              display: "flex",
              alignItems: "center",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    width: 24,
                    height: 24,
                    background: "black",
                  },
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    marginLeft: 8,
                    fontSize: 20,
                  },
                  children: "kapadiya.net",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "20px 50px",
              margin: "0 42px",
              fontSize: 40,
              width: "auto",
              maxWidth: 550,
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              lineHeight: 1.4,
            },
            children: title,
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 600,
  });
}
