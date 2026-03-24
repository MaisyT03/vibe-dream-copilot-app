# Vibe Dream - Weather Outfit App

A beautiful, modern React application that recommends outfits based on real-time weather conditions. Built with **React**, **TypeScript**, **Tailwind CSS**, and featuring **glassmorphism** design inspired by Apple's Weather app.

## ✨ Features

### 🌤️ Weather Integration
- Real-time weather data display (OpenWeatherMap API)
- Apple Weather app-inspired UI with smooth gradients
- Current temperature, "feels like," humidity, and wind speed
- Auto-refresh every minute
- Beautiful weather emoji and animated backgrounds

### 👔 Wardrobe Management
- Add clothing items with detailed metadata:
  - Item name, type (top, bottom, outerwear, footwear, accessory)
  - Color picker with visual preview
  - Season tags (spring, summer, fall, winter)
  - Weather compatibility tags (sunny, rainy, snowy, etc.)
- Edit and delete items from your wardrobe
- All data persisted to localStorage

### 🎨 Smart Outfit Recommendations
- Intelligent outfit matching engine based on:
  - Current weather conditions
  - Temperature ranges
  - Season appropriateness
- Weather match score (0-100) showing outfit suitability
- Automatic outfit updates as weather changes
- Visual outfit display with color swatches

### 🎭 Design & UX
- **Glassmorphism**: Frosted glass UI with backdrop blur effects
- **Apple Aesthetics**: Clean typography, generous spacing, light weight fonts
- **Smooth Animations**: Fade-in effects, hover states, scale transitions
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Dark Mode Ready**: Subtle gradient background with white components

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## 📦 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on source files |

## 🏗️ Project Structure

```
src/
├── components/
│   ├── WeatherDisplay.tsx      # Apple-style weather hero section
│   ├── WardrobeManager.tsx      # Wardrobe CRUD UI
│   └── OutfitRecommender.tsx    # Outfit suggestion display
├── services/
│   ├── weatherService.ts        # OpenWeatherMap API integration
│   └── outfitService.ts         # Outfit matching logic
├── types/
│   └── index.ts                 # TypeScript type definitions
├── hooks/
│   └── useLocalStorage.ts       # Custom hook for localStorage
├── App.tsx                      # Main application component
├── main.tsx                     # React entry point
└── index.css                    # Global styles + glassmorphism utilities
```

## 🎯 How It Works

1. **App loads**: Fetches current weather for Dublin (default)
2. **User builds wardrobe**: Adds clothing items with weather tags
3. **Smart matching**: Engine analyzes weather and wardrobe to create outfit
4. **Real-time updates**: Outfit refreshes automatically when weather changes
5. **Data persistence**: Everything saved to browser localStorage

## 🎨 Design Highlights

### Glassmorphism
- `.glass` utility class: White/20 opacity with blur
- `.glass-sm`: Smaller, more subtle version
- `.glass-dark`: Dark variant for contrast
- Smooth transitions on hover

### Typography
- Apple system fonts: `-apple-system, BlinkMacSystemFont`
- Light font weights for modern feel
- Clear hierarchy with size and weight

### Colors
- Blue → Purple gradient for weather display
- Subtle white gradients for glass effect
- Accent colors for interactive elements

## 💾 Storage

All user data stored in browser localStorage:
- **`wardrobe`**: Array of clothing items
- **`location`**: Current location setting
- **`user`**: Optional user preferences

## 🌐 Environment Setup

For production, add your OpenWeatherMap API key:

```typescript
// src/services/weatherService.ts
const API_KEY = 'your_api_key_here'
```

[Get free API key](https://openweathermap.org/api)

## 🔧 Tech Stack

- **React 18**: UI components with hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **Tailwind CSS**: Utility-first styling
- **PostCSS**: CSS processing with autoprefixer

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Docs](https://www.typescriptlang.org)
- [OpenWeatherMap API](https://openweathermap.org/api)

## 📝 License

MIT

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**
