import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    "project",
    {
      icon: "iconfont icon-read",
      text: "游玩教程",
      prefix: "features/",
      children: "structure",
    },
    {
      icon: "iconfont icon-article",
      text: "声明和公告",
      prefix: "statements/",
      children: "structure",
    },
  ],
});
