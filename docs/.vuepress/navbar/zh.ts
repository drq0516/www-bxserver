import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  { text: "文档", icon: "iconfont icon-article", link: "/zh/project.html" },
  //下载地址修改
  {
    text: "下载",
    icon: "iconfont icon-install",
    link: "/zh/dow.html",
  }
]);
