// Create a wrapper for anime.js to ensure consistent usage across components
import * as animeJs from "animejs"

// Export the anime object, handling both default and named export scenarios
const anime = animeJs.default || animeJs

export default anime
