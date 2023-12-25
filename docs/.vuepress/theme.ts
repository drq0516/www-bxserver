import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://hut.ao",

  author: {
    name: "亡灵暴龙大帝",
    url: "https://666",
  },

  iconAssets: [
    "iconfont",
    "https://at.alicdn.com/t/c/font_3861247_nm7gjy97qqd.css",
  ],

  logo: "https://img.alicdn.com/imgextra/i4/1797064093/O1CN01vK3m2w1g6duwt8quS_!!1797064093.png",

  repo: "DGP-Studio/Snap.Hutao",

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  //github修改地址
  docsRepo: "HongchengQ/Snap.Hutao.Docs",

  docsDir: "docs",

  locales: {
    "/en/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "Be the best Genshin Impact tool",

      displayFooter: true,

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "我们半夏公益服提供了一个愉快、免费的游戏环境，旨在促进游戏社区的共享和互助",

      displayFooter: true,

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },
  },

  plugins: {
    comment: {
      provider: "Waline",
      serverURL: "https://comments.snapgenshin.com",
      emoji: [
        "//unpkg.com/@waline/emojis@1.1.0/weibo",
        "//unpkg.com/@waline/emojis@1.1.0/bilibili",
        "//unpkg.com/@waline/emojis@1.1.0/bmoji",
        "//unpkg.com/@waline/emojis@1.1.0/qq",
        "//unpkg.com/@waline/emojis@1.1.0/tieba",
      ],
      requiredMeta: ["mail"],
      reaction: false,
    },

    components: {
      components: ["Badge", "BiliBili"],
      rootComponents: {
        notice: [
          {
            path: "/zh/",
            title: "加入我们",
            content:
              "如果你有<b>私服开发技术</b>，<b>网页后端</b>，<b>文档管理</b>或<b>视频创作</b>的经验，并希望将其施展于半夏公益服项目中，欢迎加入我们</a>",
            fullscreen: false,
            showOnce: false,
          },
        ],
      },
    },

    feed: {
      rss: true,
    },

    sitemap: {
      changefreq: "weekly",
    },

    mdEnhance: {
      align: true,
      footnote: true,
      imgLazyload: true,
      include: true,
      tabs: true,
      tasklist: true,
    },

    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: false,
      cachePic: true,
      appendBase: true,
      themeColor: "#f26d6d",
      update: "hint",
      apple: {
        icon: "/favicon.ico",
        statusBarColor: "black",
      },
      msTile: {
        image: "/favicon.ico",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/pwa-icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/pwa-icon/chrome-48.png",
            sizes: "48x48",
            type: "image/png",
          },
        ],
      },
    },
  },
});
