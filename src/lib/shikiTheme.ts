import type { ThemeRegistrationRaw } from "shiki";

/**
 * A restrained, high-contrast syntax palette that matches the site's
 * industrial visual language without making code feel disconnected.
 */
export const industrialShikiTheme: ThemeRegistrationRaw = {
  name: "kapadiya-industrial",
  type: "dark",
  colors: {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#e8e4df",
  },
  settings: [
    {
      settings: {
        background: "#1e1e1e",
        foreground: "#e8e4df",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#9c9590", fontStyle: "italic" },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: "#52b788" },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.character"],
      settings: { foreground: "#fbbf24" },
    },
    {
      scope: ["keyword", "storage", "storage.type", "storage.modifier"],
      settings: { foreground: "#f87171" },
    },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call"],
      settings: { foreground: "#22d3ee" },
    },
    {
      scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"],
      settings: { foreground: "#60a5fa" },
    },
    {
      scope: ["variable.parameter", "meta.parameters variable"],
      settings: { foreground: "#f472b6" },
    },
    {
      scope: ["variable", "variable.other", "identifier"],
      settings: { foreground: "#e8e4df" },
    },
    {
      scope: [
        "entity.other.attribute-name",
        "support.type.property-name",
        "meta.object-literal.key",
      ],
      settings: { foreground: "#ff7a2e" },
    },
    {
      scope: ["punctuation", "meta.brace", "meta.delimiter"],
      settings: { foreground: "#a8a29e" },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: { foreground: "#1e1e1e", background: "#f87171" },
    },
  ],
};
