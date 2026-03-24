# Vibe Dream Copilot App - Development Guide

This is a React application with TypeScript, Tailwind CSS, and localStorage persistence.

## Getting Started

### Setup
```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`

## Project Structure

- **src/App.tsx** - Main component with example UI
- **src/hooks/useLocalStorage.ts** - Custom hook for localStorage (see example in App.tsx)
- **src/main.tsx** - React entry point
- **src/index.css** - Global Tailwind styles
- **vite.config.ts** - Vite configuration

## Key Tools & Commands

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Preview build | `npm run preview` |
| Lint code | `npm run lint` |

## Using localStorage

The `useLocalStorage` hook simplifies storing/retrieving data:

```typescript
const [count, setCount] = useLocalStorage('count', 0)
```

- Type-safe with TypeScript
- Auto JSON conversion
- Persists across browser sessions
- See [App.tsx](./src/App.tsx) for working example

## Tailwind CSS Classes

Common classes used throughout this project:
- Layout: `flex`, `grid`, `min-h-screen`
- Spacing: `p-8`, `mb-6`, `gap-4`
- Colors: `bg-purple-500`, `text-white`
- Effects: `rounded-lg`, `shadow-lg`, `hover:bg-blue-600`
- Responsive: `max-w-2xl`, `mx-auto`

See the App component for more Tailwind examples.

## VSCode Recommendations

- Extensions: TypeScript Vue Plugin, Tailwind CSS IntelliSense
- Format on save: enable in settings
