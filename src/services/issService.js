import { normalizeLongitude } from '../utils/geo'

const ISS_NOW_URL = 'http://api.open-notify.org/iss-now.json'
const ISS_FALLBACK_URL = 'https://api.wheretheiss.at/v1/satellites/25544'

function toPosition(latitude, longitude, timestamp) {
  return {
    latitude: Number(latitude),
    longitude: normalizeLongitude(longitude),
    timestamp: Number(timestamp) * 1000,
  }
}

export async function fetchIssPosition() {
  try {
    const response = await fetch(ISS_NOW_URL)
    if (!response.ok) throw new Error('ISS feed returned an error')

    const data = await response.json()
    if (data.message !== 'success') throw new Error('ISS feed did not return a valid position')

    return toPosition(data.iss_position.latitude, data.iss_position.longitude, data.timestamp)
  } catch (error) {
    const response = await fetch(ISS_FALLBACK_URL)
    if (!response.ok) throw error

    const data = await response.json()
    return {
      latitude: Number(data.latitude),
      longitude: normalizeLongitude(data.longitude),
      timestamp: Number(data.timestamp) * 1000,
    }
  }
}
