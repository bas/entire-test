# Octodeco - AI Agent Instructions

## Project Overview
Octodeco is a Next.js 16 App Router e-commerce demo for an online sticker shop featuring GitHub Octocat-themed products. Built with React 19, TypeScript 5, and Tailwind CSS 4.

## Tech Stack
- **Next.js 16** App Router (server components by default)
- **React 19** with TypeScript 5
- **Tailwind CSS 4** with inline theme configuration
- **ESLint** with Next.js config

## Architecture

### Directory Structure
```
app/
  ├── api/products/          # Product data (products.json)
  ├── page.tsx               # Homepage
  ├── layout.tsx             # Root layout with Geist fonts
  └── globals.css            # Tailwind config + CSS variables
.github/
  ├── agents/                # Custom agent definitions (.agent.md)
  ├── prompts/               # Reusable prompts (.prompt.md)
  └── copilot-instructions.md
public/images/products/      # Product images (Octocat stickers)
```

### Key Files
- `app/api/products/products.json` - Product catalog with 20 Octocat stickers
- `.github/agents/simplifier.agent.md` - Code simplification agent
- `.github/prompts/products-page.prompt.md` - Template for creating product pages

## Development Workflow

### Commands
```bash
npm run dev    # Start dev server on localhost:3000
npm run build  # Production build
npm run lint   # Run ESLint
```

### No Test Framework Yet
This project currently has no test setup. When adding tests, prefer Vitest or Playwright based on project needs.

## Code Conventions

### TypeScript & Imports
- Use `@/*` path alias for project imports: `import { Product } from "@/app/types"`
- Type-only imports: `import type { Metadata } from "next"`
- Import order: React → external packages → internal modules → types
- Prefer `function` keyword over arrow functions for components
- Add explicit return types for exported functions

### React 19 & Next.js 16 Patterns
- **Server Components by default** - Only add `'use client'` when using:
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (localStorage, window, etc.)
  - Event handlers
- Place `'use client'` at the very top of the file (line 1)
- Use `next/image` with explicit `width` and `height` props
- Simple component props: inline types `function Card({ title }: { title: string })`
- Complex component props: separate interface `interface ProductCardProps { ... }`

### Styling with Tailwind CSS 4
- Use Tailwind utility classes exclusively (no custom CSS beyond `globals.css`)
- Design tokens defined in `globals.css`:
  - `bg-background` / `text-foreground` for theme colors
  - `--font-sans` (Geist) / `--font-mono` (Geist Mono)
- Dark mode support via `dark:` variants (though light mode is primary focus)
- Avoid nested ternaries in className conditions - prefer explicit conditionals

### Client-Side Data Patterns
When using localStorage or browser APIs:
```typescript
'use client'
const [data, setData] = useState(null)
const [isHydrated, setIsHydrated] = useState(false)

useEffect(() => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('key')
      setData(stored)
    } catch (error) {
      // Handle private browsing mode
    }
  }
  setIsHydrated(true)
}, [])
```

## Custom Agent & Skills Workflow

### Agent Skills
This project is configured for GitHub Copilot Agent Skills:
- Skills can be installed via `npx add-skill <repo>`
- Skills are defined in `.github/skills/<skill-name>/SKILL.md`
- Skills extend agent capabilities with domain expertise
- Skills auto-discovered by agents when relevant

### Custom Prompts
Reusable prompts in `.github/prompts/*.prompt.md`:
- Invoked with `/prompt-name` in agent chat
- Example: `/products-page` creates product pages following project standards

### Custom Agents
- `.github/agents/simplifier.agent.md` - Code simplifier specialized for this stack
- Agents automatically apply project conventions during refactoring

## Project-Specific Context

### Product Data
- Products served from `app/api/products/products.json`
- Each product has: id, name, description, price, image path, category
- Images located at `/images/products/{filename}.png`
- Price range: $3-6 for stickers

### Visual Design
- **Light mode first** - white backgrounds with black header/footer
- Logo: `original.png` (the original Octocat)
- Geist font family (sans and mono variants)
- Production-grade, polished UI expected in all implementations

## Common Pitfalls to Avoid
- Don't add `'use client'` unless necessary (check if you're using hooks/browser APIs)
- Don't use custom CSS - leverage Tailwind utilities
- Don't forget `width` and `height` on `next/image` components
- Don't skip the `typeof window !== 'undefined'` check for browser APIs
- Don't use arrow functions for components - use `function` keyword
