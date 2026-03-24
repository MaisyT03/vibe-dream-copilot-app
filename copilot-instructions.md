# Vibe Dream - Weather Outfit App

A React app that recommends outfits based on weather. Uses glassmorphism UI inspired by Apple Weather app.

## Quick Start

```bash
npm install
npm run dev  # Runs on http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   ├── WeatherDisplay.tsx       - Apple Weather-style display
│   ├── WardrobeManager.tsx       - Add/manage clothing items
│   └── OutfitRecommender.tsx     - Show recommended outfit
├── services/
│   ├── weatherService.ts         - OpenWeatherMap API integration
│   └── outfitService.ts          - Outfit matching algorithm
├── types/index.ts                - All TypeScript interfaces
├── hooks/useLocalStorage.ts       - localStorage persistence hook
├── App.tsx                        - Main app component
└── index.css                      - Glassmorphism utilities
```

## Key Features

### Weather Display
- Real-time weather with mock fallback
- Apple-style UI: light fonts, gradients, blur effects
- Auto-refresh every 60 seconds
- Weather emoji + temperature + humidity/wind

### Wardrobe Management
- Add items: name, type, color, season, weather tags
- Persistent localStorage storage
- Edit/delete functionality
- Weather tag matching (sunny, rainy, snowy, etc.)

### Outfit Recommendations
- Intelligent matching engine based on:
  - Current weather condition
  - Temperature appropriate layers
  - Weather tag compatibility
- Match score (0-100) showing suitability
- Auto-updates when weather or wardrobe changes

## Design System

### Glassmorphism Utilities
- `.glass` - Main frosted glass effect (white/20)
- `.glass-sm` - Subtle version (white/10)
- `.glass-dark` - Dark background variant
- `.smooth-transition` - Reusable animation class

### Typography
- Apple system font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI'`
- Light weights (font-light: 300)
- Generous spacing with mb/p utilities

### Animations
- `fade-in-up`: Entrance animation (defined in tailwind.config.js)
- `bounce-slow`: 3s bounce for emoji (weather icon)
- Hover scale transforms on interactive elements

## API Integration

**Current**: Mock weather data (no real API calls)

**To enable real weather**:
1. Sign up: https://openweathermap.org/api
2. Get API key
3. Update `src/services/weatherService.ts` line 8:
   ```typescript
   const API_KEY = 'your_api_key_here'
   ```

**Note**: App uses Dublin coordinates (53.3498, -6.2603). Extend to accept user location via geolocation API if needed.

## Component Props

### WeatherDisplay
- `weather: WeatherData | null`
- `loading?: boolean`
- `onRefresh?: () => void`

### WardrobeManager
- `items: ClothingItem[]`
- `onAdd: (item) => void`
- `onRemove: (id) => void`

### OutfitRecommender
- `outfit: OutfitRecommendation | null`
- `loading?: boolean`

## Storage Keys

All saved to localStorage:
- `wardrobe` - Array of ClothingItem
- `location` - User's location string
- `user` - Optional user preferences (extensible)

## Development Tips

1. **Add new weather conditions**: Update `WEATHER_CONDITIONS` in WardrobeManager.tsx
2. **Customize matching algorithm**: Edit `getOutfitRecommendation()` in outfitService.ts
3. **Change default location**: Update coordinates in App.tsx useEffect (line 68)
4. **Extend wardrobe types**: Add to ClothingItem type in types/index.ts

## Common Tasks

### Add a new clothing type
```typescript
// types/index.ts - Update ClothingItem type
type: 'top' | 'bottom' | 'outerwear' | 'footwear' | 'accessory' | 'newType'

// components/WardrobeManager.tsx - Update select options
<option value="newType">New Type</option>
```

### Improve outfit matching
```typescript
// services/outfitService.ts
export function getOutfitRecommendation() {
  // Adjust scoring logic here
  let score = 70 // base score
  // ... custom logic
}
```

### Style tweaks
- Global: Edit `src/index.css` for Tailwind utilities
- Components: Use `glass`, `glass-sm`, `smooth-transition` classes
- Colors: Adjust gradients in tailwind.config.js

## Performance Notes

- Lazy loads weather on mount
- Polls weather every 60 seconds (can be adjusted in App.tsx)
- localStorage persists wardrobe between sessions
- Outfits regenerate on wardrobe/weather change only

## Browser Support

- Modern browsers with ES2020+ support required
- CSS backdrop-filter support needed for glassmorphism
- Check caniuse.com for specific features on targeted browsers

