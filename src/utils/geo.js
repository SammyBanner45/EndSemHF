const EARTH_RADIUS_KM = 6371

export function toRadians(value) {
  return (Number(value) * Math.PI) / 180
}

export function haversineDistanceKm(start, end) {
  if (!start || !end) return 0

  const lat1 = toRadians(start.latitude)
  const lat2 = toRadians(end.latitude)
  const deltaLat = toRadians(end.latitude - start.latitude)
  const deltaLng = toRadians(end.longitude - start.longitude)

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function calculateSpeedKmh(previous, current) {
  if (!previous || !current) return 0

  const seconds = Math.max(1, (current.timestamp - previous.timestamp) / 1000)
  const hours = seconds / 3600

  return haversineDistanceKm(previous, current) / hours
}

export function normalizeLongitude(longitude) {
  const value = Number(longitude)
  if (Number.isNaN(value)) return 0
  return ((((value + 180) % 360) + 360) % 360) - 180
}
