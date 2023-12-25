import { sidebar } from "vuepress-theme-hope";
// 文档组在这里调整
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
      icon: "iconfont icon-read",
      text: "实用教程",
      prefix: "syjc/",
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
