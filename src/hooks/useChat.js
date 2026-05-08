import { useMemo, useState } from 'react'
import { askHuggingFace } from '../services/huggingFaceService'
import { readLocalStorage, writeLocalStorage } from '../utils/storage'

const CHAT_KEY = 'iss-dashboard-chat'
const MAX_MESSAGES = 30
const FALLBACK_ANSWER = "I don't have that information"

function buildPrompt(question, issData, newsData) {
  const latest = issData.latest
  const issSummary = latest
    ? `Latitude: ${latest.latitude.toFixed(4)}, Longitude: ${latest.longitude.toFixed(4)}, Speed km/h: ${Math.round(
        latest.speed,
      )}, Timestamp: ${new Date(latest.timestamp).toISOString()}`
    : 'No ISS data available.'

  const articleSummary =
    newsData.articles
      ?.map(
        (article, index) =>
          `${index + 1}. ${article.title} | ${article.source} | ${article.date} | ${article.description}`,
      )
      .join('\n') || 'No news data available.'

  return `You are a strict dashboard assistant.
Only answer using the ISS data and news data below.
If the answer is not directly available in the provided data, answer exactly: ${FALLBACK_ANSWER}

ISS DATA:
${issSummary}

NEWS DATA:
${articleSummary}

QUESTION:
${question}

ANSWER:`
}

function canAnswerLocally(question, issData, newsData) {
  const text = question.toLowerCase()
  const latest = issData.latest

  if (!latest && !newsData.articles?.length) return FALLBACK_ANSWER

  if (latest && text.includes('latitude')) return `The ISS latitude is ${latest.latitude.toFixed(4)}.`
  if (latest && text.includes('longitude')) return `The ISS longitude is ${latest.longitude.toFixed(4)}.`
  if (latest && text.includes('speed')) return `The ISS speed is about ${Math.round(latest.speed).toLocaleString()} km/h.`

  if (newsData.articles?.length && (text.includes('news') || text.includes('article') || text.includes('headline'))) {
    return newsData.articles
      .slice(0, 3)
      .map((article) => `${article.title} (${article.source})`)
      .join('\n')
  }

  return null
}

export function useChat(issData, newsData) {
  const [messages, setMessages] = useState(() => readLocalStorage(CHAT_KEY, []))
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')

  const hasData = useMemo(() => Boolean(issData.latest || newsData.articles?.length), [issData.latest, newsData.articles])

  async function sendMessage(content) {
    const question = content.trim()
    if (!question) return

    const userMessage = { id: crypto.randomUUID(), role: 'user', content: question, createdAt: Date.now() }
    const nextMessages = [...messages, userMessage].slice(-MAX_MESSAGES)
    setMessages(nextMessages)
    writeLocalStorage(CHAT_KEY, nextMessages)
    setIsSending(true)
    setError('')

    try {
      const localAnswer = canAnswerLocally(question, issData, newsData)
      const answer = localAnswer ?? (hasData ? await askHuggingFace(buildPrompt(question, issData, newsData)) : FALLBACK_ANSWER)
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: answer || FALLBACK_ANSWER,
        createdAt: Date.now(),
      }
      const updatedMessages = [...nextMessages, assistantMessage].slice(-MAX_MESSAGES)
      setMessages(updatedMessages)
      writeLocalStorage(CHAT_KEY, updatedMessages)
    } catch (requestError) {
      const assistantMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: FALLBACK_ANSWER,
        createdAt: Date.now(),
      }
      const updatedMessages = [...nextMessages, assistantMessage].slice(-MAX_MESSAGES)
      setMessages(updatedMessages)
      writeLocalStorage(CHAT_KEY, updatedMessages)
      setError(requestError.message || 'Unable to send message')
    } finally {
      setIsSending(false)
    }
  }

  return { messages, sendMessage, isSending, error }
}
