import { createElement, type ReactNode } from "react";
import type { RenderFunctionInput } from "astro-takumi";

const h = createElement as (...args: any[]) => ReactNode;

export async function renderOpenGraphImage({
  title,
  description,
  document,
  pathname,
}: RenderFunctionInput): Promise<ReactNode> {
  const displayTitle = title.replace(/ \| Vikas Kapadiya$/, "");
  const category =
    document
      .querySelector('meta[property="article:section"]')
      ?.getAttribute("content") ?? (pathname.startsWith("/blog/") ? "Writing" : "AI Engineer");
  const eyebrow = category.toUpperCase();
  const summary = description?.slice(0, 150) ?? "Agents, LLM tooling, TypeScript, and open source.";

  return h(
    "div",
    {
      tw: "h-full w-full flex flex-col justify-between bg-[#141414] text-[#e8e4df] px-[72px] py-[60px] relative",
    },
    h("div", {
      tw: "absolute inset-0",
      style: {
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      },
    }),
    h(
      "div",
      { tw: "flex items-center justify-between relative" },
      h(
        "div",
        { tw: "flex items-center" },
        h(
          "div",
          {
            tw: "flex items-center justify-center w-[52px] h-[52px] bg-[#f25c05] text-black text-[20px] font-bold mr-4",
          },
          "VK",
        ),
        h("div", { tw: "text-[22px] font-bold tracking-wide" }, "VIKAS KAPADIYA"),
      ),
      h("div", { tw: "text-[20px] text-[#9c9590]" }, "KAPADIYA.NET"),
    ),
    h(
      "div",
      { tw: "flex flex-col relative max-w-[1040px]" },
      h(
        "div",
        { tw: "flex items-center text-[#f25c05] text-[20px] font-bold tracking-[0.16em] mb-6" },
        h("div", { tw: "w-[44px] h-[2px] bg-[#f25c05] mr-4" }),
        eyebrow,
      ),
      h(
        "h1",
        {
          tw: "text-[62px] leading-[1.03] font-bold tracking-[-0.035em] m-0",
        },
        displayTitle,
      ),
      h(
        "p",
        { tw: "text-[24px] leading-[1.4] text-[#a8a29e] mt-7 mb-0 max-w-[980px]" },
        summary,
      ),
    ),
    h(
      "div",
      { tw: "flex items-center justify-between relative border-t border-[#3f3f3f] pt-6" },
      h("div", { tw: "text-[18px] text-[#a8a29e]" }, "Agents · TypeScript · Open source"),
      h("div", { tw: "text-[18px] text-[#f25c05] font-bold" }, "READ /"),
    ),
  );
}
