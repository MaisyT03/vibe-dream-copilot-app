import { WeatherData } from '../types/index'

interface WeatherDisplayProps {
  weather: WeatherData | null
  loading?: boolean
  onRefresh?: () => void
}

export function WeatherDisplay({ weather, loading = false, onRefresh }: WeatherDisplayProps) {
  if (!weather && !loading) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>Loading weather data...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-6 pb-32 overflow-hidden gradient-weather">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -right-48" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-white text-2xl font-light tracking-tight">
            {weather?.location || 'Weather'}
          </h1>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="text-white/70 hover:text-white transition disabled:opacity-50 text-2xl smooth-transition"
          >
            {loading ? '⟳' : '↻'}
          </button>
        </div>

        {/* Main Weather Info */}
        <div className="flex flex-col items-center justify-center">
          {/* Weather Icon */}
          <div className="text-9xl mb-6 drop-shadow-lg animate-bounce-slow">
            {getWeatherEmoji(weather?.condition || 'clear')}
          </div>

          {/* Temperature */}
          <div className="flex items-baseline gap-2">
            <span className="text-8xl font-light text-white drop-shadow-lg">
              {weather?.temp || '--'}
            </span>
            <span className="text-4xl text-white/80">°C</span>
          </div>

          {/* Condition */}
          <p className="text-2xl text-white/90 mt-6 capitalize font-light tracking-wide">
            {weather?.description || 'Unknown'}
          </p>

          {/* Feels Like */}
          <p className="text-lg text-white/70 mt-3 font-light">
            Feels like {weather?.feelsLike}°
          </p>
        </div>
      </div>

      {/* Bottom Info Cards */}
      <div className="relative z-10 grid grid-cols-2 gap-4">
        {/* Humidity Card */}
        <div className="glass weather-card">
          <p className="text-sm font-light opacity-80 mb-3">Humidity</p>
          <p className="text-4xl font-light">{weather?.humidity}%</p>
        </div>

        {/* Wind Speed Card */}
        <div className="glass weather-card">
          <p className="text-sm font-light opacity-80 mb-3">Wind</p>
          <p className="text-4xl font-light">{weather?.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Get emoji for weather condition with animation support
 */
function getWeatherEmoji(condition: string): string {
  const condition_lower = condition.toLowerCase()
  
  if (condition_lower.includes('clear') || condition_lower.includes('sunny')) return '☀️'
  if (condition_lower.includes('cloud')) return '☁️'
  if (condition_lower.includes('rain')) return '🌧️'
  if (condition_lower.includes('snow')) return '❄️'
  if (condition_lower.includes('thunder') || condition_lower.includes('storm')) return '⛈️'
  if (condition_lower.includes('fog') || condition_lower.includes('mist')) return '🌫️'
  
  return '🌤️'
}
