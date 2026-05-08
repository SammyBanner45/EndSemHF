const NEWS_CACHE_KEY = 'iss-dashboard-news-cache'
const NEWS_CACHE_TTL = 15 * 60 * 1000

export const FALLBACK_NEWS_ARTICLES = [
  {
    title: 'Live dashboard fallback: ISS telemetry is available while NewsAPI is unavailable',
    source: 'ISS Dashboard',
    date: new Date().toISOString(),
    image: null,
    description:
      'The live news provider did not return articles. Add a valid VITE_NEWS_API_KEY or retry after the provider is reachable.',
    url: '',
    isFallback: true,
  },
]

export function getCachedNews() {
  try {
    const raw = localStorage.getItem(NEWS_CACHE_KEY)
    if (!raw) return null

    const cached = JSON.parse(raw)
    if (Date.now() - cached.cachedAt > NEWS_CACHE_TTL) return null

    return cached.articles
  } catch {
    return null
  }
}

export function cacheNews(articles) {
  try {
    localStorage.setItem(
      NEWS_CACHE_KEY,
      JSON.stringify({
        cachedAt: Date.now(),
        articles,
      }),
    )
  } catch {
    // Non-critical cache write.
  }
}

export async function fetchNewsArticles() {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY
  if (!apiKey || apiKey === 'your_key_here') {
    throw new Error('Missing VITE_NEWS_API_KEY. Add it to your .env file.')
  }

  const url = new URL('https://newsapi.org/v2/everything')
  url.searchParams.set('q', 'International Space Station OR NASA OR space')
  url.searchParams.set('language', 'en')
  url.searchParams.set('sortBy', 'publishedAt')
  url.searchParams.set('pageSize', '10')
  url.searchParams.set('apiKey', apiKey)

  const response = await fetch(url)
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const providerMessage = data?.message ? `: ${data.message}` : ''
    throw new Error(`NewsAPI request failed (${response.status})${providerMessage}`)
  }

  return (data.articles ?? []).slice(0, 10).map((article) => ({
    title: article.title ?? 'Untitled article',
    source: article.source?.name ?? 'Unknown source',
    date: article.publishedAt,
    image: article.urlToImage,
    description: article.description ?? 'No description available.',
    url: article.url,
  }))
}
