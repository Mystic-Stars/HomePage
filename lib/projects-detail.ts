import AxolotlHome from "@/public/axolotl/launcher-home.webp"
import AxolotlLab from "@/public/axolotl/axolotl-lab.png"
import AxolotlAccount from "@/public/axolotl/account-login.png"
import AxolotlTheme from "@/public/axolotl/theme-accent.png"
import AxolotlIcon from "@/public/axolotl-icon.png"
import CoverlyIcon from "@/public/coverly-icon.png"
import CoverlyEditor from "@/public/coverly/editor-overview.jpg"
import CoverlyProjectManager from "@/public/coverly/project-manager.png"
import Coverly from "@/public/Coverly.png"
import { StaticImageData } from "next/image"

export interface ProjectScreenshot {
  id: string
  image: StaticImageData | string
  title: string
  title_zh: string
  caption: string
  caption_zh: string
}

export interface ArchitectureLayer {
  layer: string
  layer_zh: string
  tech: string[]
  description: string
  desc_zh: string
}

export interface ProjectFeature {
  icon: "zap" | "box" | "shield" | "palette" | "cpu" | "layout" | "lock" | "globe"
  title: string
  title_zh: string
  description: string
  desc_zh: string
  tag: string
}

export interface ProjectSpec {
  label: string
  label_zh: string
  value: string
}

export interface ProjectDetail {
  id: string
  title: string
  title_zh: string
  tagline: string
  tagline_zh: string
  category: string
  category_zh: string
  badge: string
  status: string
  status_zh: string
  version: string
  license: string
  tags: string[]
  icon: StaticImageData | string
  mainImage: StaticImageData | string
  projectUrl?: string
  demoUrl?: string
  sandboxUrl?: string
  screenshots: ProjectScreenshot[]
  architecture: ArchitectureLayer[]
  features: ProjectFeature[]
  specs: ProjectSpec[]
}

export const projectsDetailData: Record<string, ProjectDetail> = {
  axolotl: {
    id: "axolotl",
    title: "Axolotl Launcher",
    title_zh: "Axolotl Launcher",
    tagline:
      "Next-generation Minecraft Java launcher: versatile, aesthetic, and cross-platform with Modrinth & CurseForge support.",
    tagline_zh:
      "次世代 Minecraft 桌面客户端，全能、美观、全平台覆盖。支持 Modrinth 与 CurseForge 生态聚合与内置实验室。",
    category: "Desktop Client",
    category_zh: "次世代桌面客户端",
    badge: "Tauri v2 • Rust • Vue 3",
    status: "Active Open Source",
    status_zh: "积极迭代中",
    version: "GPL-3.0",
    license: "GPL-3.0 Free Software",
    tags: ["Minecraft", "Tauri v2", "Rust 2024", "Vue 3", "Modrinth"],
    icon: AxolotlIcon,
    mainImage: AxolotlHome,
    projectUrl: "https://github.com/Mystic-Stars/Axolotl",
    demoUrl: "https://www.axlmc.org",
    screenshots: [
      {
        id: "axl-home",
        image: AxolotlHome,
        title: "Main Dashboard & Content Discovery",
        title_zh: "主界面仪表盘与双生态内容发现",
        caption:
          "Unified search, installation, and auto-updating for Modrinth & CurseForge mods, modpacks, resource packs, and shaders.",
        caption_zh:
          "在同一个客户端中无缝搜索、安装与更新来自 Modrinth 与 CurseForge 的模组、整合包、资源包与光影，自动处理前置依赖。",
      },
      {
        id: "axl-lab",
        image: AxolotlLab,
        title: "Built-in Axolotl Lab",
        title_zh: "内置 Axolotl 实验室极客工具箱",
        caption:
          "Integrated toolbox featuring gradient text generator, Java seed map viewer, 3D schematic workshop, and mod translation tools.",
        caption_zh:
          "无需跳出外部网页，启动器内置渐变文字生成器、Java 种子地图、3D 投影工坊、配方生成器与模组翻译工具。",
      },
      {
        id: "axl-account",
        image: AxolotlAccount,
        title: "Flexible Account Authentication",
        title_zh: "多元账户与身份认证体系",
        caption:
          "Comprehensive auth matrix supporting official Microsoft accounts, local offline IDs, and LittleSkin / custom Yggdrasil servers.",
        caption_zh:
          "支持 Microsoft 正版账户、本地离线身份，以及 LittleSkin 皮肤站预设与自定义 Yggdrasil 外置登录服务器。",
      },
      {
        id: "axl-theme",
        image: AxolotlTheme,
        title: "Adaptive Themes & OLED Mode",
        title_zh: "多套色彩主题与 OLED 纯黑适配",
        caption:
          "Smooth switching between Light, Dark, OLED Pure Black, and System mode, with customizable accent colors and glassmorphism.",
        caption_zh:
          "浅色、深色、OLED 纯黑与跟随系统平滑切换，自由定制强调色、背景壁纸与窗口通透毛玻璃效果。",
      },
    ],
    architecture: [
      {
        layer: "Monorepo & Tooling",
        layer_zh: "工程架构与多包工作区",
        tech: ["Turborepo", "pnpm Workspaces", "@axolotl/monorepo"],
        description:
          "Modular monorepo architecture managing desktop app shell, Vue 3 frontend, shared UI library, and Nuxt 3 website.",
        desc_zh:
          "基于 Turborepo 与 pnpm workspaces 模块化多包架构，统一调度桌面应用外壳、Vue 3 前端、共享 UI 库与 Nuxt 3 官网。",
      },
      {
        layer: "Desktop Frontend Layer",
        layer_zh: "桌面应用前端展示层 (apps/app-frontend)",
        tech: ["Vue 3", "Tailwind CSS v3", "FormatJS (i18n)", "@axolotl/ui"],
        description:
          "High-performance Vue 3 client with tab-indentation discipline, reactive onboarding tours, and release announcement catalog.",
        desc_zh:
          "基于 Vue 3 + Tailwind CSS 构建的高性能客户端，集成交互式新手引导机制、更新公告系统与全系统主题自适应。",
      },
      {
        layer: "Desktop Shell & Rust Core",
        layer_zh: "桌面原生核心与协议库 (apps/app & packages)",
        tech: ["Tauri v2", "Rust 2024 (1.90)", "daedalus", "modrinth-content-management"],
        description:
          "Quiet, lightweight desktop core keeping resource consumption minimal. Includes daedalus metadata protocol and content installer.",
        desc_zh:
          "基于 Tauri v2 与 Rust 2024 (1.90.0) 打造极轻量桌面核心，自研 daedalus 元数据协议与 modrinth-content-management 安装模型。",
      },
      {
        layer: "System Infrastructure & Security",
        layer_zh: "系统底层、网络与安全存储",
        tech: ["Tokio Async", "reqwest Multi-stream", "keyring", "discord-rich-presence", "notify"],
        description:
          "Concurrent chunked downloads, secure OS keyring storage for auth tokens, file system debounce watching, and Discord RPC.",
        desc_zh:
          "高并发多线程下载调度器、操作系统级 keyring 安全凭证保管箱、本地文件变动去抖监听与 Discord 状态联动。",
      },
      {
        layer: "Cross-Platform Packaging",
        layer_zh: "跨平台原生打包与分发",
        tech: ["Windows (x64)", "macOS (Apple Silicon & Intel)", "Linux (AppImage/DEB/RPM)"],
        description:
          "Full native cross-platform releases supporting Windows 10/11, universal macOS binaries, and all major Linux distributions.",
        desc_zh:
          "原生覆盖 Windows 10/11、macOS 双架构通用二进制与主流 Linux 发行版（AppImage、DEB、RPM 安装包）。",
      },
    ],
    features: [
      {
        icon: "box",
        title: "Modrinth & CurseForge Aggregation",
        title_zh: "双生态深度聚合",
        description:
          "Search, install, and update content from both Modrinth and CurseForge in one client with automatic dependency handling.",
        desc_zh:
          "同一个客户端无缝检索与更新两大主流生态的模组、整合包、资源包与光影，自动递归补齐依赖。",
        tag: "Ecosystem",
      },
      {
        icon: "zap",
        title: "Built-in Axolotl Lab",
        title_zh: "内置 Axolotl 实验室",
        description:
          "Built-in toolbox with gradient text generator, Java seed map viewer, 3D schematic workshop, recipe builder, and mod translation.",
        desc_zh:
          "无需跳出网页，启动器内置渐变文字生成器、Java 种子地图、3D 投影工坊、合成配方生成与模组翻译工具箱。",
        tag: "Lab Tools",
      },
      {
        icon: "shield",
        title: "Flexible Account Choices",
        title_zh: "多元账户与皮肤认证",
        description:
          "Supports official Microsoft Minecraft accounts, local offline IDs, and LittleSkin / custom Yggdrasil auth servers.",
        desc_zh:
          "支持微软官方正版、本地离线身份，以及 LittleSkin 皮肤站预设与自定义 Yggdrasil 外置登录服务器。",
        tag: "Auth",
      },
      {
        icon: "palette",
        title: "Themes for Every Setup",
        title_zh: "全套色彩主题与 OLED 纯黑",
        description:
          "Switch between Light, Dark, OLED Pure Black, and System mode with custom accent colors, backgrounds, and transparency.",
        desc_zh:
          "浅色、深色、OLED 纯黑与跟随系统平滑切换，自由定制强调色、背景壁纸与窗口通透毛玻璃效果。",
        tag: "Themes",
      },
    ],
    specs: [
      { label: "Architecture", label_zh: "架构形式", value: "Turborepo + pnpm Monorepo" },
      { label: "Frontend", label_zh: "前端框架", value: "Vue 3 + Tailwind CSS" },
      { label: "Native Shell", label_zh: "原生核心", value: "Tauri v2 + Rust 2024 (1.90)" },
      { label: "Platforms", label_zh: "全平台覆盖", value: "Windows / macOS / Linux" },
      { label: "License", label_zh: "开源许可", value: "GPL-3.0 Free Software" },
      { label: "Mod Ecosystem", label_zh: "内容生态", value: "Modrinth + CurseForge" },
    ],
  },
  coverly: {
    id: "coverly",
    title: "Coverly",
    title_zh: "Coverly 封面工坊",
    tagline:
      "Make cover creation simpler. Lightweight horizontal cover design tool for blog posts, event pages, and social media.",
    tagline_zh:
      "让封面创作更简单。专为博客文章、活动页与社交媒体打造的轻巧横向封面设计平台。",
    category: "Cover Design Studio",
    category_zh: "封面设计工作台",
    badge: "Next.js 16 • React 19 • Canvas",
    status: "Production Ready",
    status_zh: "线上稳定运行",
    version: "v1.2.0",
    license: "MIT License",
    tags: ["Next.js 16", "React 19", "Tailwind CSS", "Canvas API", "ag-psd", "Local-First"],
    icon: CoverlyIcon,
    mainImage: CoverlyEditor,
    projectUrl: "https://github.com/Mystic-Stars/Coverly",
    demoUrl: "https://cover.mysticstars.cn/",
    sandboxUrl: "https://cover.mysticstars.cn/",
    screenshots: [
      {
        id: "cov-editor",
        image: CoverlyEditor,
        title: "Cover Editor: Templates, Canvas & Properties",
        title_zh: "封面编辑器：模板、画布和属性面板",
        caption:
          "Intuitive horizontal cover layout with gradient templates, smart snapping guides, font tuning, asset scaling/rotation, and glassmorphism styling.",
        caption_zh:
          "直观高效的横向封面设计环境：内置精选渐变模板与调色方案，支持素材自由拖拽/缩放/旋转、智能吸附对齐参考线、文字排版字距微调及仿玻璃质感。",
      },
      {
        id: "cov-manager",
        image: CoverlyProjectManager,
        title: "Project Manager: Browse, Archive, Import & Export",
        title_zh: "项目管理：浏览、归档、导入和导出设计",
        caption:
          "100% in-browser offline project management. Automatically persists drafts to LocalStorage with instant archiving, project JSON import/export, and zero backend required.",
        caption_zh:
          "纯浏览器本地运行的工程管理中心：设计草稿自动持久化保存至本地存储，支持随时浏览草稿、归档历史、导入与导出项目 JSON 文件，无需任何后端或登录。",
      },
    ],
    architecture: [
      {
        layer: "Framework & Client Core",
        layer_zh: "现代全栈前端与响应式界面",
        tech: ["Next.js 16.2", "React 19.2", "Tailwind CSS", "TypeScript"],
        description:
          "Modern React 19 architecture with instant client-side rendering, smooth property panels, and zero server latency.",
        desc_zh:
          "基于 Next.js 16 与 React 19 顶尖技术栈构建，提供极速响应的属性面板与零延迟本地交互。",
      },
      {
        layer: "Canvas & Rendering Engine",
        layer_zh: "自由画布与 2D 图像处理引擎",
        tech: ["HTML5 Canvas 2D", "Smart Snapping Guides", "Image Filters", "Undo/Redo Stack"],
        description:
          "High-fidelity 2D canvas pipeline supporting free asset dragging, rotation, crop, blur, brightness/saturation tuning, and sub-pixel text layout.",
        desc_zh:
          "高精度 2D 画布渲染管道，支持主素材任意拖拽、缩放、旋转与智能吸附对齐；集成高斯模糊、亮度饱和度滤镜微调及撤销重做（Undo/Redo）历史栈。",
      },
      {
        layer: "Typography & Icon Ecosystem",
        layer_zh: "扩展字体矩阵与图标生态",
        tech: ["@fontsource (10+ Fonts)", "Custom Fonts (TTF/WOFF2)", "@iconify/react", "Keyword Search"],
        description:
          "Built-in popular typography presets (Bebas Neue, Noto Sans/Serif SC, ZCOOL fonts) + custom font upload + instant keyword icon search.",
        desc_zh:
          "内置 Bebas Neue、黑体、楷书、宋体、站酷快乐体等多套经典字体预设，支持上传自定义 TTF/WOFF2 字体；集成 @iconify 图标库并支持关键词即时检索。",
      },
      {
        layer: "Multi-Engine Native Export",
        layer_zh: "原生多引擎导出系统",
        tech: ["ag-psd (Photoshop PSD)", "jspdf (Vector PDF)", "PNG / JPG / WebP", "Coverly JSON"],
        description:
          "Industrial-grade client-side export pipelines: generates layered Photoshop PSD files via ag-psd, sharp vector PDF prints, and optimized raster images.",
        desc_zh:
          "工业级纯前端导出流水线：利用 ag-psd 引擎原生生成分层 Photoshop PSD 文件、高分辨率矢量 PDF 文档，以及 PNG/JPG/WebP 与工程 JSON。",
      },
      {
        layer: "Local-First Data Architecture",
        layer_zh: "本地优先持久化与隐私防护",
        tech: ["Browser LocalStorage", "Zero Backend Service", "Zero Login Required", "Project JSON Import/Export"],
        description:
          "Zero-tracking, 100% private local-first architecture. All projects stay safely inside the user's browser, accessible offline anytime.",
        desc_zh:
          "零跟踪、绝对隐私的 100% 本地优先架构。无需注册登录与服务器上传，所有设计项目安全驻留于浏览器本地，并支持无缝导入导出。",
      },
    ],
    features: [
      {
        icon: "palette",
        title: "Curated Gradients & Custom Presets",
        title_zh: "精选渐变模板与自定义预设",
        description:
          "Multiple built-in gradient color schemes, with one-click saving of your current design style into personal reusable presets.",
        desc_zh:
          "内置多组精选渐变模板与调色方案，支持将当前画布配色与视觉样式一键保存为专属自定义模板。",
        tag: "Templates",
      },
      {
        icon: "layout",
        title: "Free Canvas & Smart Snapping",
        title_zh: "自由画布与智能吸附对齐",
        description:
          "Freely drag, scale, and rotate main assets with smart alignment snapping guides and complete Undo/Redo history stack.",
        desc_zh:
          "主素材支持任意自由拖拽、缩放、旋转，并提供智能吸附对齐参考线与完整的撤销/重做（Undo/Redo）历史记录。",
        tag: "Canvas",
      },
      {
        icon: "box",
        title: "Image Tuning & Glassmorphism",
        title_zh: "素材精修与拟态玻璃质感",
        description:
          "Crop, scale, position, blur, brightness, and saturation adjustments for background and graphic assets, with fine typography letter-spacing controls.",
        desc_zh:
          "细致调节裁切、缩放、位置、高斯模糊、亮度与饱和度，并支持文字字体、字距、透明度及仿毛玻璃质感调节。",
        tag: "Styling",
      },
      {
        icon: "cpu",
        title: "Custom Fonts & Keyword Icon Search",
        title_zh: "自定义字体与关键词图标库",
        description:
          "Upload custom TTF/WOFF2 font files and search through rich icon collections by keyword in real time.",
        desc_zh:
          "支持上传自定义字体文件（TTF/WOFF2），预置 10+ 常用中英文字体库，并提供可按关键词即时检索的丰富矢量图标。",
        tag: "Typography",
      },
      {
        icon: "shield",
        title: "Native Photoshop PSD & Multi-Format Export",
        title_zh: "原生分层 PSD 与专业多格式导出",
        description:
          "Export native layered Photoshop PSD files via ag-psd, crisp vector PDF documents, high-res PNG/JPG/WebP images, and Coverly project files.",
        desc_zh:
          "依托 ag-psd 原生生成分层 Photoshop PSD 文件，支持导出高清矢量 PDF、PNG、JPG、WebP 及 Coverly 项目工程。",
        tag: "Export",
      },
      {
        icon: "lock",
        title: "100% Local-First & Project Management",
        title_zh: "纯本地离线与工程归档管理",
        description:
          "Auto-saves designs locally in browser with zero login or server requirement. Complete project manager for archiving, importing, and exporting.",
        desc_zh:
          "编辑数据默认保存在浏览器本地，无需登录或后端服务；内置项目管理器，轻松实现设计草稿的浏览、归档、导入与导出。",
        tag: "Local-First",
      },
    ],
    specs: [
      { label: "Export Formats", label_zh: "导出格式", value: "PSD (Layered) / PDF / PNG / JPG / WebP / JSON" },
      { label: "PSD Engine", label_zh: "PSD 引擎", value: "ag-psd (Native Layered PSD)" },
      { label: "Canvas Engine", label_zh: "画布引擎", value: "HTML5 Canvas 2D + Smart Snapping" },
      { label: "Frontend Stack", label_zh: "前端框架", value: "Next.js 16 + React 19 + Tailwind CSS" },
      { label: "Architecture", label_zh: "运行架构", value: "100% Local-First (Offline)" },
      { label: "License", label_zh: "许可协议", value: "MIT Open Source License" },
    ],
  },
}

export function getProjectDetailById(id: string): ProjectDetail | undefined {
  return projectsDetailData[id.toLowerCase()]
}

export function findProjectDetailByTitle(title: string): ProjectDetail | undefined {
  const t = title.toLowerCase()
  if (t.includes("axolotl")) return projectsDetailData.axolotl
  if (t.includes("coverly")) return projectsDetailData.coverly
  return undefined
}

