import { WeatherData, WeatherCondition } from '../types/index'

/**
 * Weather API Service
 * Uses OpenWeatherMap API (free tier)
 * Note: For production, store API key in environment variables
 */

const API_KEY = 'demo' // Replace with real API key from openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function getWeatherByCoords(lat: number, lon: number, unit: 'C' | 'F' = 'C'): Promise<WeatherData> {
  try {
    const units = unit === 'C' ? 'metric' : 'imperial'
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Weather API error')
    }

    const data = await response.json()
    
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      icon: data.weather[0].icon,
      location: data.name,
      lat,
      lon,
    }
  } catch (error) {
    console.error('Failed to fetch weather:', error)
    // Return mock data for demo
    return getMockWeather(lat, lon)
  }
}

export async function getWeatherByCity(city: string, unit: 'C' | 'F' = 'C'): Promise<WeatherData> {
  try {
    const units = unit === 'C' ? 'metric' : 'imperial'
    const url = `${BASE_URL}?q=${city}&units=${units}&appid=${API_KEY}`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Weather API error')
    }

    const data = await response.json()
    
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      icon: data.weather[0].icon,
      location: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon,
    }
  } catch (error) {
    console.error('Failed to fetch weather:', error)
    return getMockWeather(0, 0)
  }
}

/**
 * Mock weather data for demo purposes
 */
function getMockWeather(lat: number, lon: number): WeatherData {
  const conditions: WeatherCondition[] = ['clear', 'cloudy', 'rainy', 'snowy']
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
  
  return {
    temp: 18,
    feelsLike: 16,
    condition: randomCondition,
    description: `${randomCondition} skies`,
    humidity: 65,
    windSpeed: 12,
    icon: '02d',
    location: 'Demo City',
    lat,
    lon,
  }
}

/**
 * Convert weather condition to normalized format
 */
export function normalizeWeatherCondition(condition: string): WeatherCondition {
  const normalized = condition.toLowerCase()
  
  if (normalized.includes('clear') || normalized.includes('sunny')) return 'clear'
  if (normalized.includes('cloud')) return 'cloudy'
  if (normalized.includes('rain')) return 'rainy'
  if (normalized.includes('snow')) return 'snowy'
  if (normalized.includes('thunder') || normalized.includes('storm')) return 'stormy'
  if (normalized.includes('fog') || normalized.includes('mist')) return 'foggy'
  if (normalized.includes('sun')) return 'sunny'
  
  return 'partly-cloudy'
}

/**
 * Get icon URL for weather condition
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`
}
