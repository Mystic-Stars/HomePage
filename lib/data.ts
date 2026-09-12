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

export interface SkillItem {
    name: string;
    iconName: string;
    color: string;
    tag: string;
}

export interface SkillCategoryGroup {
    id: "languages" | "frameworks" | "tools" | "creative";
    skills: SkillItem[];
}

export const skillsCategories: SkillCategoryGroup[] = [
    {
        id: "languages",
        skills: [
            { name: "TypeScript", iconName: "SiTypescript", color: "#3178C6", tag: "Full-Stack" },
            { name: "JavaScript", iconName: "SiJavascript", color: "#F7DF1E", tag: "Frontend" },
            { name: "Rust", iconName: "SiRust", color: "#CE412B", tag: "Systems & Tauri" },
            { name: "Python", iconName: "SiPython", color: "#3776AB", tag: "Automation & Backend" },
            { name: "HTML5", iconName: "SiHtml5", color: "#E34F26", tag: "Markup" },
            { name: "CSS3", iconName: "SiCss3", color: "#1572B6", tag: "Styles & Motion" },
        ],
    },
    {
        id: "frameworks",
        skills: [
            { name: "Next.js", iconName: "SiNextdotjs", color: "#000000", tag: "Full-Stack SSR" },
            { name: "React", iconName: "SiReact", color: "#61DAFB", tag: "UI Components" },
            { name: "Tauri", iconName: "SiTauri", color: "#24C8DB", tag: "Desktop Cross-Platform" },
            { name: "Tailwind CSS", iconName: "SiTailwindcss", color: "#06B6D4", tag: "Modern UI" },
        ],
    },
    {
        id: "tools",
        skills: [
            { name: "Git", iconName: "SiGit", color: "#F05032", tag: "Version Control" },
            { name: "GitHub", iconName: "SiGithub", color: "#6e5494", tag: "Open Source" },
            { name: "VS Code", iconName: "SiVisualstudiocode", color: "#007ACC", tag: "Dev Environment" },
            { name: "Zed", iconName: "SiZedindustries", color: "#0845F5", tag: "High-Perf Editor" },
            { name: "Node.js", iconName: "SiNodedotjs", color: "#5FA04E", tag: "Runtime & Tooling" },
        ],
    },
    {
        id: "creative",
        skills: [
            { name: "Minecraft", iconName: "SiMinecraft", color: "#5B8C33", tag: "Sandbox & Community" },
            { name: "Scratch", iconName: "SiScratch", color: "#F99B1D", tag: "Visual Logic" },
        ],
    },
];

export const skillsData = skillsCategories.flatMap((cat) => cat.skills.map((s) => s.name));

