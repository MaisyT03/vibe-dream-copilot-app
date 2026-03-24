import { useState } from 'react'
import { ClothingItem, WeatherCondition } from '../types/index'

const WEATHER_CONDITIONS: WeatherCondition[] = [
  'clear', 'cloudy', 'rainy', 'snowy', 'stormy', 'foggy', 'sunny', 'partly-cloudy'
]

const SEASONS = ['spring', 'summer', 'fall', 'winter'] as const

interface WardrobeManagerProps {
  items: ClothingItem[]
  onAdd: (item: ClothingItem) => void
  onRemove: (id: string) => void
}

export function WardrobeManager({ items, onAdd, onRemove }: WardrobeManagerProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'top' as const,
    color: '#000000',
    season: 'spring' as const,
    weatherTags: [] as WeatherCondition[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || formData.weatherTags.length === 0) {
      alert('Please fill all fields and select at least one weather tag')
      return
    }

    const newItem: ClothingItem = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      color: formData.color,
      season: formData.season,
      weatherTags: formData.weatherTags,
    }

    onAdd(newItem)
    setFormData({
      name: '',
      type: 'top',
      color: '#000000',
      season: 'spring',
      weatherTags: [],
    })
    setIsAdding(false)
  }

  const toggleWeatherTag = (condition: WeatherCondition) => {
    setFormData(prev => ({
      ...prev,
      weatherTags: prev.weatherTags.includes(condition)
        ? prev.weatherTags.filter(c => c !== condition)
        : [...prev.weatherTags, condition]
    }))
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/40 smooth-transition hover:shadow-xl">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
        My Wardrobe
      </h2>

      {/* Wardrobe Items Grid */}
      {items.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 font-semibold mb-4">Items in wardrobe ({items.length})</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {items.map(item => (
              <div
                key={item.id}
                className="glass-sm p-5 hover:bg-white/20 smooth-transition group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg border-2 border-white/40 shadow-lg group-hover:scale-110 smooth-transition"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.weatherTags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-xs text-red-500 hover:text-red-700 font-bold smooth-transition"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Item Form */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="w-full mb-4 px-4 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg smooth-transition transform hover:scale-105 disabled:opacity-50"
      >
        {isAdding ? '✕ Cancel' : '+ Add Clothing Item'}
      </button>

      {isAdding && (
        <form onSubmit={handleSubmit} className="glass-sm p-6 rounded-2xl">
          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Item Name
            </label>
            <input
              type="text"
              placeholder="e.g., Blue Denim Jacket"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-white/40 rounded-xl focus:outline-none focus:border-purple-500 bg-white/50 backdrop-blur"
            />
          </div>

          {/* Type */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-4 py-3 border-2 border-white/40 rounded-xl focus:outline-none focus:border-purple-500 bg-white/50 backdrop-blur"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="outerwear">Outerwear</option>
              <option value="footwear">Footwear</option>
              <option value="accessory">Accessory</option>
            </select>
          </div>

          {/* Color */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 border-white/40"
              />
              <span className="text-sm text-gray-600 font-medium">{formData.color}</span>
            </div>
          </div>

          {/* Season */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Season
            </label>
            <select
              value={formData.season}
              onChange={e => setFormData({ ...formData, season: e.target.value as any })}
              className="w-full px-4 py-3 border-2 border-white/40 rounded-xl focus:outline-none focus:border-purple-500 bg-white/50 backdrop-blur"
            >
              {SEASONS.map(season => (
                <option key={season} value={season}>
                  {season.charAt(0).toUpperCase() + season.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Weather Tags */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Best for Weather
            </label>
            <div className="grid grid-cols-2 gap-3">
              {WEATHER_CONDITIONS.map(condition => (
                <label
                  key={condition}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={formData.weatherTags.includes(condition)}
                    onChange={() => toggleWeatherTag(condition)}
                    className="w-4 h-4 text-purple-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize group-hover:text-purple-600 smooth-transition">
                    {condition}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg smooth-transition"
          >
            Add to Wardrobe
          </button>
        </form>
      )}
    </div>
  )
}
