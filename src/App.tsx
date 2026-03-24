import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { WeatherDisplay } from './components/WeatherDisplay'
import { WardrobeManager } from './components/WardrobeManager'
import { OutfitRecommender } from './components/OutfitRecommender'
import { getWeatherByCoords } from './services/weatherService'
import { getOutfitRecommendation } from './services/outfitService'
import { WeatherData, ClothingItem, OutfitRecommendation } from './types/index'

function App() {
  // Weather state
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(false)

  // Wardrobe state
  const [wardrobe, setWardrobe] = useLocalStorage<ClothingItem[]>('wardrobe', [
    {
      id: '1',
      name: 'Light Sweater',
      type: 'top',
      color: '#E8E8E8',
      season: 'spring',
      weatherTags: ['sunny', 'clear', 'partly-cloudy', 'cloudy'],
    },
    {
      id: '2',
      name: 'Jeans',
      type: 'bottom',
      color: '#1E3A8A',
      season: 'spring',
      weatherTags: ['sunny', 'clear', 'partly-cloudy', 'cloudy'],
    },
    {
      id: '3',
      name: 'Sneakers',
      type: 'footwear',
      color: '#FFFFFF',
      season: 'spring',
      weatherTags: ['sunny', 'clear', 'partly-cloudy', 'cloudy'],
    },
    {
      id: '4',
      name: 'Rain Jacket',
      type: 'outerwear',
      color: '#3B82F6',
      season: 'fall',
      weatherTags: ['rainy', 'stormy'],
    },
    {
      id: '5',
      name: 'Waterproof Boots',
      type: 'footwear',
      color: '#713F12',
      season: 'fall',
      weatherTags: ['rainy', 'snowy'],
    },
  ])

  // Outfit recommendation
  const [outfit, setOutfit] = useState<OutfitRecommendation | null>(null)

  // User location
  const [location, setLocation] = useLocalStorage('location', 'Dublin, Ireland')
  const [newLocation, setNewLocation] = useState(location)

  // Fetch weather on mount and periodically
  useEffect(() => {
    const fetchWeather = async () => {
      setWeatherLoading(true)
      try {
        // Default to Dublin for demo
        const weatherData = await getWeatherByCoords(53.3498, -6.2603)
        setWeather(weatherData)

        // Generate outfit recommendation
        if (wardrobe.length > 0) {
          const recommendation = getOutfitRecommendation(
            wardrobe,
            weatherData.condition as any,
            weatherData.temp
          )
          setOutfit(recommendation)
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error)
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [wardrobe])

  const handleAddItem = (item: ClothingItem) => {
    setWardrobe([...wardrobe, item])
  }

  const handleRemoveItem = (id: string) => {
    setWardrobe(wardrobe.filter(item => item.id !== id))
  }

  const handleUpdateLocation = () => {
    setLocation(newLocation)
  }

  const handleRefreshWeather = async () => {
    setWeatherLoading(true)
    try {
      const weatherData = await getWeatherByCoords(53.3498, -6.2603)
      setWeather(weatherData)

      if (wardrobe.length > 0) {
        const recommendation = getOutfitRecommendation(
          wardrobe,
          weatherData.condition as any,
          weatherData.temp
        )
        setOutfit(recommendation)
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error)
    } finally {
      setWeatherLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Weather Display - Full Screen Hero */}
      <div className="relative">
        {weather ? (
          <WeatherDisplay weather={weather} loading={weatherLoading} onRefresh={handleRefreshWeather} />
        ) : (
          <div className="gradient-weather h-96 md:h-screen lg:h-[600px] flex items-center justify-center">
            <p className="text-white text-2xl font-light">Loading weather...</p>
          </div>
        )}
      </div>

      {/* Main Content - Overlaps slightly with hero */}
      <div className="relative -mt-20 px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Location Control */}
          <div className="mb-10 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 md:p-8 border border-white/40 smooth-transition">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">📍 Location Settings</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newLocation}
                onChange={e => setNewLocation(e.target.value)}
                placeholder="Enter city name"
                className="flex-1 px-4 py-3 border-2 border-white/40 rounded-xl focus:outline-none focus:border-purple-500 bg-white/50 backdrop-blur smooth-transition"
              />
              <button
                onClick={handleUpdateLocation}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg smooth-transition transform hover:scale-105 whitespace-nowrap"
              >
                Update
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Column - Wardrobe Manager */}
            <div className="animate-fade-in-up">
              <WardrobeManager
                items={wardrobe}
                onAdd={handleAddItem}
                onRemove={handleRemoveItem}
              />
            </div>

            {/* Right Column - Outfit Recommendation */}
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <OutfitRecommender outfit={outfit} loading={weatherLoading} />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-center">
            <div className="glass-sm p-6 md:p-8 rounded-2xl">
              <p className="text-gray-700 font-medium mb-2">🎨 Smart Outfit Suggestions</p>
              <p className="text-gray-600 text-sm mb-4">
                Your wardrobe automatically updates outfit recommendations based on real-time weather conditions
              </p>
              <p className="text-gray-600 text-sm">
                💾 All your data is securely saved to your device
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
