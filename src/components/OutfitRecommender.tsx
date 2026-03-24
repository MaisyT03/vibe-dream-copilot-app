import { OutfitRecommendation } from '../types/index'

interface OutfitRecommenderProps {
  outfit: OutfitRecommendation | null
  loading?: boolean
}

export function OutfitRecommender({ outfit, loading = false }: OutfitRecommenderProps) {
  if (!outfit || loading) {
    return (
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/40">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          Today's Outfit
        </h2>
        <div className="text-center py-12 text-gray-400">
          <p>Loading outfit recommendation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/40 smooth-transition hover:shadow-xl">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
        Today's Outfit
      </h2>
      <p className="text-gray-700 mb-6 text-lg font-medium">{outfit.reason}</p>

      {/* Match Score */}
      <div className="mb-8 p-5 glass-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-700">Weather Match</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {outfit.weatherMatch}%
          </span>
        </div>
        <div className="w-full bg-gray-300/30 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full smooth-transition"
            style={{ width: `${outfit.weatherMatch}%` }}
          />
        </div>
      </div>

      {/* Outfit Items */}
      {outfit.items.length > 0 ? (
        <div className="space-y-4">
          {outfit.items.map((item, idx) => (
            <div
              key={item.id}
              className="glass-sm p-5 hover:bg-white/20 smooth-transition group transform hover:scale-105 hover:translate-x-1"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-center gap-5">
                {/* Color Swatch */}
                <div
                  className="w-14 h-14 rounded-2xl border-2 border-white/40 shadow-lg group-hover:shadow-xl group-hover:scale-110 smooth-transition"
                  style={{ backgroundColor: item.color }}
                />

                {/* Item Info */}
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-lg">{item.name}</p>
                  <p className="text-sm text-gray-600 capitalize font-medium">{item.type}</p>
                </div>

                {/* Weather Tags */}
                <div className="flex flex-wrap gap-2 justify-end">
                  {item.weatherTags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-gradient-to-r from-purple-200 to-blue-200 text-purple-800 px-3 py-1 rounded-full font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>Add items to your wardrobe to get outfit recommendations</p>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 p-5 glass-sm border-l-4 border-amber-400/70">
        <p className="text-sm text-gray-800 font-medium">
          💡 Tip: Add more clothing items to your wardrobe to get even better outfit suggestions!
        </p>
      </div>
    </div>
  )
}
