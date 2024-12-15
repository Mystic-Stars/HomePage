import React from "react";
import { FaReact } from "react-icons/fa";
import GHS from "@/public/GHS.png";
import Blog from "@/public/blog.png";
import TimeX from "@/public/TimeX.webp";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { FaRss } from "react-icons/fa6";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
    {
        name: "Home",
        hash: "#home",
        name_zh: "首页",
    },
    {
        name: "About",
        hash: "#about",
        name_zh: "关于",
    },
    {
        name: "Projects",
        hash: "#projects",
        name_zh: "项目",
    },
    {
        name: "Skills",
        hash: "#skills",
        name_zh: "技能",
    },
    {
        name: "Subscribe",
        hash: "#subscribe",
        name_zh: "订阅",
    },
    // {
    //     name: "Experience",
    //     hash: "#experience",
    // },
    // {
    //     name: "Contact",
    //     hash: "#contact",
    // },
] as const;

export const headerLanguageMap = {
    Home: '首页',
    About: '关于我',
    Projects: '我的项目',
    Skills: '我的技能',
    Subscribe: '订阅',
}

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
    {
        title: "TimeX",
        title_zh: '星星图册——由TimeX驱动',
        description:
            "A concise, efficient, and visually appealing photo blog platform.",
        desc_zh: "TimeX是一款简洁、高效、美观的基于Typecho的照片博客主题。",
        tags: ["Typecho", "PHP", "CSS"],
        imageUrl: TimeX,
        projectUrl: 'https://github.com/Mystic-stars/TimeX',
        demoUrl: 'https://plog.mysticstars.cn',
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
