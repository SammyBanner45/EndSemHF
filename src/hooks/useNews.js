import { useCallback, useEffect, useMemo, useState } from 'react'
import { FALLBACK_NEWS_ARTICLES, cacheNews, fetchNewsArticles, getCachedNews } from '../services/newsService'

export function useNews() {
  const [articles, setArticles] = useState(() => getCachedNews() ?? [])
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  const [isLoading, setIsLoading] = useState(!getCachedNews())
  const [error, setError] = useState('')

  const loadArticles = useCallback(async () => {
    try {
      setIsLoading(true)
      setError('')
      const freshArticles = await fetchNewsArticles()
      setArticles(freshArticles)
      cacheNews(freshArticles)
    } catch (requestError) {
      const cached = getCachedNews()
      if (cached?.length) {
        setArticles(cached)
      } else {
        setArticles(FALLBACK_NEWS_ARTICLES)
      }
      setError(requestError.message || 'Unable to load news')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const cached = getCachedNews()
    if (!cached) {
      const timeoutId = window.setTimeout(loadArticles, 0)
      return () => window.clearTimeout(timeoutId)
    }
    return undefined
  }, [loadArticles])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const searched = normalizedQuery
      ? articles.filter((article) =>
          [article.title, article.source, article.description].some((value) =>
            value?.toLowerCase().includes(normalizedQuery),
          ),
        )
      : articles

    return [...searched].sort((a, b) => {
      if (sortBy === 'source') return a.source.localeCompare(b.source)
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date)
      return new Date(b.date) - new Date(a.date)
    })
  }, [articles, query, sortBy])

  const distribution = useMemo(() => {
    const counts = articles.reduce((acc, article) => {
      acc[article.source] = (acc[article.source] ?? 0) + 1
      return acc
    }, {})

    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }, [articles])

  return {
    articles,
    filteredArticles,
    distribution,
    query,
    setQuery,
    sortBy,
    setSortBy,
    isLoading,
    error,
    refetch: loadArticles,
  }
}
