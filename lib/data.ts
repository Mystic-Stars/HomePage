import React from "react";
import { FaReact } from "react-icons/fa";
import GHS from "@/public/GHS.png";
import GHSIcon from "@/public/ghs-icon.png";
import Axolotl from "@/public/Axolotl.webp";
import AxolotlIcon from "@/public/axolotl-icon.png";
import Coverly from "@/public/Coverly.png";
import CoverlyIcon from "@/public/coverly-icon.png";
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
        title: "Axolotl Launcher",
        title_zh: "Axolotl Launcher",
        description:
            "Open-source, cross-platform next-generation launcher.\nYour last next launcher",
        desc_zh: "开源，跨平台的下一代启动器\n你的最后一款启动器",
        tags: ["Minecraft", "Tauri", "Rust"],
        imageUrl: Axolotl,
        iconUrl: AxolotlIcon,
        projectUrl: 'https://github.com/Mystic-Stars/Axolotl',
        demoUrl: 'https://axlmc.org',
    },
    {
        title: "Coverly",
        title_zh: "Coverly",
        description:
            "Lightweight, elegant cover design tool.\nMake cover creation simpler.",
        desc_zh: "轻巧、优雅的封面设计工具\n让封面创作更简单",
        tags: ["Next.js", "React", "Tailwind CSS"],
        imageUrl: Coverly,
        iconUrl: CoverlyIcon,
        projectUrl: 'https://github.com/Mystic-Stars/Coverly',
        demoUrl: 'https://cover.mysticstars.cn/',
    },
    {
        title: "Garbage Human Studio",
        title_zh: "Garbage Human Studio",
        description:
            "The official website of GHS.",
        desc_zh: "GHS 官网",
        tags: ["Html", "Css", "Javascript"],
        imageUrl: GHS,
        iconUrl: GHSIcon,
        demoUrl: 'https://www.ghs.red',
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

