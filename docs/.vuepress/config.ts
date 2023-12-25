import { viteBundler } from "@vuepress/bundler-vite";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { googleAnalyticsPlugin } from "@vuepress/plugin-google-analytics";
import { defineUserConfig } from "vuepress";
import { redirectPlugin } from "vuepress-plugin-redirect";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  dest: "./dist",

  head: [
    [
      "script",
      {
        src: "https://umami.irain.in/script.js",
        "data-website-id": "1a7be6c3-a024-47e2-9a42-29e66b997a36",
        async: "",
        defer: "",
      },
    ],
    [
      "script",
      {
        type: "module",
        src: "https://get.microsoft.com/badge/ms-store-badge.bundled.js",
      },
    ],
  ],

  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "半夏公益服",
      description: "多功能的原神工具箱",
    },
    "/en/": {
      lang: "en-US",
      title: "BanxiaServer",
      description: "Super utilitarian Genshin Impact Toolkit",
    },
  },

  plugins: [
    googleAnalyticsPlugin({
      id: "G-F3LFJCE3RM",
    }),
    redirectPlugin({
      defaultLocale: "/en/",
      autoLocale: true,
      switchLocale: "modal",
      localeConfig: {
        "/en/": ["en-US", "en-UK", "en"],
        "/zh/": ["zh-CN", "zh-TW", "zh"],
      },
    }),
  ],

  theme,

  shouldPrefetch: false,

  bundler: viteBundler({
    viteOptions: {
      build: {
        chunkSizeWarningLimit: 1500,
      },
    },
  }),
});
