import { WeatherCondition, ClothingItem, OutfitRecommendation } from '../types/index'

/**
 * Outfit Matching Service
 * Generates outfit recommendations based on weather conditions
 */

export function getOutfitRecommendation(
  wardrobe: ClothingItem[],
  weatherCondition: WeatherCondition,
  temperature: number
): OutfitRecommendation {
  // Filter items that match the weather condition
  const matchedItems = wardrobe.filter(item =>
    item.weatherTags.includes(weatherCondition)
  )

  // If no exact matches, get close matches
  let recommendedItems = matchedItems.length > 0 
    ? matchedItems 
    : getSimilarWeatherItems(wardrobe, weatherCondition)

  // Ensure we have at least one of each type
  const outfit = buildBalancedOutfit(recommendedItems)

  const weatherMatch = calculateMatchScore(outfit, weatherCondition, temperature)

  return {
    items: outfit,
    reason: getOutfitReason(weatherCondition, temperature),
    weatherMatch,
  }
}

/**
 * Build a balanced outfit with top, bottom, outerwear, and footwear
 */
function buildBalancedOutfit(items: ClothingItem[]): ClothingItem[] {
  const outfit: ClothingItem[] = []
  const types: Array<'top' | 'bottom' | 'outerwear' | 'footwear'> = ['top', 'bottom', 'footwear', 'outerwear']

  for (const type of types) {
    const itemOfType = items.find(item => item.type === type)
    if (itemOfType) {
      outfit.push(itemOfType)
    }
  }

  return outfit.length > 0 ? outfit : items.slice(0, 3)
}

/**
 * Get items with similar weather conditions
 */
function getSimilarWeatherItems(wardrobe: ClothingItem[], condition: WeatherCondition): ClothingItem[] {
  const weatherGroups = {
    clear: ['clear', 'sunny', 'partly-cloudy'],
    cloudy: ['cloudy', 'partly-cloudy'],
    rainy: ['rainy', 'stormy'],
    snowy: ['snowy', 'stormy'],
    stormy: ['rainy', 'stormy'],
    foggy: ['cloudy', 'foggy'],
    sunny: ['clear', 'sunny'],
    'partly-cloudy': ['cloudy', 'partly-cloudy', 'clear'],
  }

  const similarConditions = weatherGroups[condition] || ['partly-cloudy']
  
  return wardrobe.filter(item =>
    similarConditions.some(sim => item.weatherTags.includes(sim as WeatherCondition))
  )
}

/**
 * Calculate how well the outfit matches the weather (0-100)
 */
function calculateMatchScore(outfit: ClothingItem[], condition: WeatherCondition, temp: number): number {
  let score = 70 // Base score

  // Check if all necessary types are present
  const types = new Set(outfit.map(item => item.type))
  if (types.has('top') && types.has('bottom')) score += 10
  if (types.has('footwear')) score += 10
  if (types.has('outerwear') && temp < 10) score += 10

  // Check weather match
  const weatherMatches = outfit.filter(item => item.weatherTags.includes(condition))
  score += Math.min((weatherMatches.length / outfit.length) * 10, 10)

  return Math.min(score, 100)
}

/**
 * Get a reason for the outfit recommendation
 */
function getOutfitReason(condition: WeatherCondition, temperature: number): string {
  const tempStr = temperature < 10 ? 'cold' : temperature < 20 ? 'cool' : temperature < 25 ? 'mild' : 'warm'
  
  const reasons: Record<WeatherCondition, string> = {
    clear: `Perfect for ${tempStr} and clear skies`,
    cloudy: `Comfortable option for ${tempStr} and cloud cover`,
    rainy: `Great for rainy weather - waterproof and stylish`,
    snowy: `Warm and cozy for snowy conditions`,
    stormy: `Safe and protective for stormy weather`,
    foggy: `Practical outfit for foggy conditions`,
    sunny: `Ideal for sunny and ${tempStr} weather`,
    'partly-cloudy': `Versatile look for variable conditions`,
  }

  return reasons[condition]
}

/**
 * Get outfit suggestions for next 3 days (mock implementation)
 */
export function get3DayOutlookSuggestions(
  wardrobe: ClothingItem[],
  conditions: WeatherCondition[],
  temperatures: number[]
): OutfitRecommendation[] {
  return conditions.map((condition, index) =>
    getOutfitRecommendation(wardrobe, condition, temperatures[index])
  )
}
