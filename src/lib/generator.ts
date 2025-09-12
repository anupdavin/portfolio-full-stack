// Client-side text generation via transformers.js (Xenova) using GPT-2 small

let generator: any | null = null

export async function loadGenerator() {
  if (generator) return generator
  const { pipeline } = await import('@xenova/transformers')
  generator = await pipeline('text-generation', 'Xenova/gpt2', {
    quantized: true,
  })
  return generator
}

export async function generateAnswer(prompt: string, opts?: { maxNewTokens?: number }) {
  const pipe = await loadGenerator()
  const out = await pipe(prompt, {
    max_new_tokens: opts?.maxNewTokens ?? 128,
    temperature: 0.7,
    repetition_penalty: 1.2,
    do_sample: true,
    top_k: 50,
    top_p: 0.95,
  })
  const text = Array.isArray(out) ? out[0]?.generated_text ?? '' : String(out)
  return text
}

