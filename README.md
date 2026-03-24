# Vibe Dream - Copilot App

A modern React application built with **React**, **TypeScript**, **Tailwind CSS**, and **localStorage** support.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Browser storage with custom hook

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

### 🎨 Tailwind CSS
Pre-configured with Tailwind CSS for rapid UI development. See [App.tsx](src/App.tsx) for examples.

### 💾 localStorage Hook
Custom `useLocalStorage` hook for easy state persistence:

```typescript
import { useLocalStorage } from './hooks/useLocalStorage'

function MyComponent() {
  const [user, setUser] = useLocalStorage('user', null)
  
  return (
    <div>
      {user && <p>Welcome, {user.name}!</p>}
    </div>
  )
}
```

Features:
- Type-safe with TypeScript generics
- Automatic JSON serialization
- Error handling
- Functional updates support

### 📝 TypeScript
Full TypeScript support with strict mode enabled for better type safety.

## Project Structure

```
src/
├── App.tsx           # Main application component
├── main.tsx          # React entry point
├── index.css         # Global styles with Tailwind
└── hooks/
    └── useLocalStorage.ts  # Custom localStorage hook
```

## Learn More

- [React Documentation](https://reactjs.org)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

## License

MIT
