import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchIssPosition } from '../services/issService'
import { calculateSpeedKmh } from '../utils/geo'

const POLL_INTERVAL_MS = 15_000
const MAX_POSITIONS = 30
const DISPLAY_POSITIONS = 15

export function useIssTracker() {
  const [positions, setPositions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchPosition = useCallback(async () => {
    try {
      setError('')
      const position = await fetchIssPosition()
      setPositions((current) => {
        const previous = current.at(-1)
        const speed = calculateSpeedKmh(previous, position)
        return [...current, { ...position, speed }].slice(-MAX_POSITIONS)
      })
    } catch (requestError) {
      setError(requestError.message || 'Unable to load ISS position')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(fetchPosition, 0)
    const intervalId = window.setInterval(fetchPosition, POLL_INTERVAL_MS)
    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [fetchPosition])

  const latest = positions.at(-1)
  const visiblePositions = positions.slice(-DISPLAY_POSITIONS)
  const chartData = useMemo(
    () =>
      positions.map((position) => ({
        time: new Date(position.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        speed: Math.round(position.speed),
      })),
    [positions],
  )

  return {
    positions: visiblePositions,
    allPositions: positions,
    latest,
    speedChartData: chartData,
    isLoading,
    error,
    refetch: fetchPosition,
  }
}
