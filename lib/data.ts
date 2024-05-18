import React from "react";
import { FaReact } from "react-icons/fa";
import GHS from "@/public/GHS.png";
import Blog from "@/public/blog.png";


export const links = [
    {
        name: "Home",
        hash: "#home",
    },
    {
        name: "About",
        hash: "#about",
    },
    {
        name: "Projects",
        hash: "#projects",
    },
    {
        name: "Skills",
        hash: "#skills",
    },
    // {
    //     name: "Contact",
    //     hash: "#contact",
    // },
] as const;


export const headerLanguageMap = {
    Home: '首页',
    About: '关于我',
    Projects: '我的项目',
    Skills: '我的技能',}


export type ProjectTags = typeof projectsData[number]["tags"];

export const projectsData = [
    {
        title: "Mystic Stars Blog",
        title_zh: "Mystic Stars Blog",
        description:
            `Welcome to my personal blog, where I will be sharing my code and articles. Feel free to explore and enjoy your visit! 
            `,
        desc_zh: "这是我的个人博客，我将在这里发布我的代码和文章，欢迎访问。",
        tags: ["Web", "Halo", "Blog"],
        imageUrl: Blog,
        projectUrl: 'https://github.com/chengzhongxue/halo-theme-hao',
        demoUrl: 'https://www.mysticstars.cn',
    },
    {
        title: "GHS 2024",
        title_zh: 'GHS 2024',
        description:
            "The official website of GHS.",
        desc_zh: "GHS的官方网站。",
        tags: ["Html", "Css", "Javascript"],
        imageUrl: GHS,
        projectUrl: 'https://github.com/Mystic-stars/GHS',
        demoUrl: 'https://www.ghs.red',
    },



]

export const skillsData = [
    "HTML",
    "CSS",
    "Python",
    "Web",
    "Git",
    "Github",
    "Minecraft",
    "Scratch",
] 
