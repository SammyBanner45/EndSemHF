export async function askHuggingFace(prompt) {
  const token = import.meta.env.VITE_AI_TOKEN
  if (!token) {
    throw new Error('Missing VITE_AI_TOKEN. Add it to your .env file.')
  }

  const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-base', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 160,
        temperature: 0.2,
        return_full_text: false,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('The Hugging Face API did not return a response')
  }

  const data = await response.json()
  if (Array.isArray(data)) {
    return data[0]?.generated_text?.trim() || "I don't have that information"
  }

  return data.generated_text?.trim() || "I don't have that information"
}
