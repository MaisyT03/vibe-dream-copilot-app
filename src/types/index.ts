/**
 * Weather-related types
 */

export interface WeatherData {
  temp: number
  feelsLike: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  icon: string
  location: string
  lat: number
  lon: number
}

export type WeatherCondition = 
  | 'clear'
  | 'cloudy'
  | 'rainy'
  | 'snowy'
  | 'stormy'
  | 'foggy'
  | 'sunny'
  | 'partly-cloudy'

export interface ClothingItem {
  id: string
  name: string
  type: 'top' | 'bottom' | 'outerwear' | 'footwear' | 'accessory'
  color: string
  weatherTags: WeatherCondition[]
  season: 'spring' | 'summer' | 'fall' | 'winter'
  image?: string
}

export interface OutfitRecommendation {
  items: ClothingItem[]
  reason: string
  weatherMatch: number // 0-100
}

export interface UserPreferences {
  location: string
  temperatureUnit: 'C' | 'F'
  lat: number
  lon: number
}
