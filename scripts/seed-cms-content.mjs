import {mkdir, writeFile, access} from "node:fs/promises"
import {constants} from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()

const sitePath = path.join(root, "content", "settings", "site.json")
const aboutPath = path.join(root, "content", "pages", "about.md")

const shouldForce = process.argv.includes("--force")

const seededSite = {
  seo: {
    siteTitle: "Layan Altaher — Graphic Designer & Content Creator",
    siteDescription:
      "Portfolio of Layan Altaher — graphic designer, brand identity, and content creator based in Amman, Jordan.",
    aboutTitle: "About — Layan Altaher",
    aboutDescription:
      "About Layan Altaher — graphic designer, brand identity, and content creator based in Amman, Jordan.",
    reelsTitle: "Reels — Layan Altaher",
    reelsDescription:
      "Motion and content reels by Layan Altaher — brand identity, social media, and design process videos.",
  },
  home: {
    heroEyebrow: "— Portfolio",
    heroTitleLine1: "CREATIVE",
    heroTitleLine2: "DESIGNER",
    heroTagline: "Turning brands into experiences — through design, storytelling, and visual identity.",
    scrollLabel: "SCROLL",

    aboutEyebrow: "— About Me",
    aboutTitle: "GET TO KNOW ME",
    aboutBody:
      "I'm Layan — a marketing student at the University of Jordan with a passion for turning ideas into bold visual identities. I work across graphic design, branding, and content creation.",
    aboutCtaLabel: "More about me →",
    aboutCtaUrl: "/about",
    aboutImage: "/images/uploads/about-portrait.jpg",

    servicesHeading: "WHAT I DO",
    services: ["Graphic Design", "Brand Identity", "Content Creation", "Social Media"],
  },
  footer: {
    ctaText: "LET'S WORK TOGETHER",
    email: "Layan04ibrahim@gmail.com",
    copyright: "© Layan Altaher",
    socialLinks: [
      {label: "Instagram", href: "#"},
      {label: "LinkedIn", href: "#"},
      {label: "Behance", href: "#"},
    ],
  },
  contact: {
    email: "Layan04ibrahim@gmail.com",
    location: "Amman, Jordan",
    cvUrl: "/cv.pdf",
  },
}

const seededAbout = `---
title: Hi! I'm Layan
intro: Marketing student and graphic designer from Amman, Jordan.
portrait: /images/uploads/about-portrait.jpg
ctaLabel: Let's work together
ctaUrl: mailto:Layan04ibrahim@gmail.com
bioParagraphs:
  - I'm Layan — a marketing student at the University of Jordan with a deep passion for turning ideas into bold visual identities. Design, to me, is the art of making ideas impossible to ignore.
  - Over the past few years I've worked across graphic design, brand identity, and content creation — helping organisations like KPMG Jordan and TEDxJU communicate with purpose and visual precision.
  - Whether I'm building an identity system from scratch or redesigning a social media presence, I bring the same obsessive attention to detail and love of storytelling to every project.
timeline:
  - org: TEDxJU 2025
    role: Graphic Designer
    year: "2025"
    slug: tedxju-2025
  - org: KPMG Jordan
    role: Content Creator Intern
    year: "2024"
    slug: kpmg
  - org: Kalmntina
    role: Social Media Intern
    year: "2024"
    slug: kalmntina
tools:
  - Illustrator
  - Photoshop
  - Premiere
  - After Effects
  - Canva
  - Figma
---

Marketing student and graphic designer from Amman, Jordan.
`

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

async function safeWrite(filePath, contents) {
  const alreadyExists = await exists(filePath)

  if (alreadyExists && !shouldForce) {
    console.log(`Skipped existing file: ${path.relative(root, filePath)}`)
    return
  }

  await mkdir(path.dirname(filePath), {recursive: true})
  await writeFile(filePath, contents, "utf8")
  console.log(`Wrote: ${path.relative(root, filePath)}`)
}

async function main() {
  await safeWrite(sitePath, `${JSON.stringify(seededSite, null, 2)}\n`)
  await safeWrite(aboutPath, seededAbout)
  console.log("\nDone.")
  console.log("Use --force to overwrite existing CMS seed files.")
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
