export interface BlogPost {
  href: string
  title: string
  title_en?: string
  description: string
  desc_en?: string
  category: string
  category_en?: string
  date?: string
  tags: string[]
  coverImage: string
  fullUrl: string
}

// 已知博客文章专属高质量封面图库（根据文章 Slug 自动匹配）
const KNOWN_COVERS: Record<string, string> = {
  "coverly": "https://raw.githubusercontent.com/Mystic-Stars/Acorn/main/public/images/posts/coverly.webp",
  "acorn-theme": "https://raw.githubusercontent.com/Mystic-Stars/Acorn/main/public/images/posts/acorn.webp",
  "my-homepage": "https://bu.dusays.com/2024/05/18/6648b0f15d0d8.png",
  "timex": "https://bu.dusays.com/2024/06/13/666a67893e2f8.webp",
  "to-the-moon-soundtrack": "https://bu.dusays.com/2024/05/18/6648b0f15d0d8.png",
}

const DEFAULT_COVER = "https://raw.githubusercontent.com/Mystic-Stars/Acorn/main/public/images/posts/blog-overview.png"

export function resolveCoverImage(href: string): string {
  // 从 href (如 "/archives/coverly/" 或 "archives/coverly") 中提取 slug
  const segments = href.replace(/^\/+|\/+$/g, "").split("/")
  const slug = segments[segments.length - 1]?.toLowerCase() || ""

  if (slug && KNOWN_COVERS[slug]) {
    return KNOWN_COVERS[slug]
  }

  // 默认尝试 Acorn 规范的封面路径
  return slug ? `https://www.mysticstars.cn/images/posts/${slug}.webp` : DEFAULT_COVER
}

export const fallbackFeaturedPosts: BlogPost[] = [
  {
    title: "开源 Coverly：让封面创作更简单",
    title_en: "Open Source Coverly: Simplify Cover Creation",
    description: "一款免登录、基于浏览器的快速封面编辑器。支持多尺寸预设、渐变色彩与多格式导出，让设计更轻松优雅。",
    desc_en: "A browser-based cover editor with zero login required. Multi-preset canvas, gradient palettes, and rich export formats.",
    category: "项目开发",
    category_en: "Project",
    date: "2026-07-12",
    tags: ["开源", "Next.js", "Coverly"],
    coverImage: "https://raw.githubusercontent.com/Mystic-Stars/Acorn/main/public/images/posts/coverly.webp",
    fullUrl: "https://www.mysticstars.cn/archives/coverly/",
    href: "/archives/coverly/",
  },
  {
    title: "Acorn：全新 Astro 博客主题",
    title_en: "Acorn: A Fresh Astro Blog Theme",
    description: "一套由 Astro 驱动、带着一点动森小岛气息的温暖博客主题。纯静态生成，极速加载与精美排版。",
    desc_en: "A warm Astro-powered blog theme with an Animal Crossing vibe. Pure static generation, blazing speed, and refined typography.",
    category: "软件技术",
    category_en: "Software",
    date: "2026-07-12",
    tags: ["Astro", "博客", "开源"],
    coverImage: "https://raw.githubusercontent.com/Mystic-Stars/Acorn/main/public/images/posts/acorn.webp",
    fullUrl: "https://www.mysticstars.cn/archives/acorn-theme/",
    href: "/archives/acorn-theme/",
  },
  {
    title: "我搭建了我的个人主页网站",
    title_en: "Building My Personal Portfolio Website",
    description: "记录基于 Next.js 开发个人主页的实践心得，含架构设计、毛玻璃拟态与 Vercel 部署指南。",
    desc_en: "Design philosophy and craftsmanship behind this homepage: Bento grids, glassmorphism, and subtle micro-interactions.",
    category: "建站心得",
    category_en: "Showcase",
    date: "2024-05-18",
    tags: ["前端", "Tailwind", "建站记录"],
    coverImage: "https://bu.dusays.com/2024/05/18/6648b0f15d0d8.png",
    fullUrl: "https://www.mysticstars.cn/archives/my-homepage/",
    href: "/archives/my-homepage/",
  },
]

const SEARCH_INDEX_URL = "https://www.mysticstars.cn/search-index.json"

export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(SEARCH_INDEX_URL, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return fallbackFeaturedPosts.slice(0, limit)
    }

    const items: Array<{
      href: string
      title: string
      description: string
      category?: string
      tags?: string[]
    }> = await response.json()

    if (!Array.isArray(items) || items.length === 0) {
      return fallbackFeaturedPosts.slice(0, limit)
    }

    // 过滤掉非文章页面（如首页或归档页），转换为 BlogPost
    const posts: BlogPost[] = items
      .filter((item) => item.href && item.href.includes("/archives/") && item.title)
      .slice(0, limit)
      .map((item) => {
        const cleanHref = item.href.startsWith("/") ? item.href : `/${item.href}`
        const fullUrl = `https://www.mysticstars.cn${cleanHref}`
        const coverImage = resolveCoverImage(cleanHref)

        return {
          href: cleanHref,
          title: item.title,
          description: item.description || "",
          category: item.category || "博客随笔",
          tags: item.tags || ["博文"],
          coverImage,
          fullUrl,
        }
      })

    return posts.length > 0 ? posts : fallbackFeaturedPosts.slice(0, limit)
  } catch {
    // 构建或离线降级
    return fallbackFeaturedPosts.slice(0, limit)
  }
}
