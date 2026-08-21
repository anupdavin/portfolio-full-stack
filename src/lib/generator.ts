// Client-side text generation via transformers.js (Xenova) using GPT-2 small.
// Keep the public API typed even though the library's dynamic pipeline factory
// is intentionally broad.

type GenerationOptions = {
  max_new_tokens?: number
  temperature?: number
  repetition_penalty?: number
  do_sample?: boolean
  top_k?: number
  top_p?: number
}

type GeneratedText = { generated_text?: string }
type TextGenerator = (prompt: string, options?: GenerationOptions) => Promise<GeneratedText | GeneratedText[]>

let generator: TextGenerator | null = null

export async function loadGenerator() {
  if (generator) return generator
  const { pipeline } = await import('@xenova/transformers')
  generator = await pipeline('text-generation', 'Xenova/gpt2', {
    quantized: true,
  }) as unknown as TextGenerator
  return generator
}

export async function generateAnswer(prompt: string, opts?: { maxNewTokens?: number }) {
  const pipe = await loadGenerator()
  const out = await pipe(prompt, {
    max_new_tokens: opts?.maxNewTokens ?? 60,
    temperature: 0.2,
    repetition_penalty: 1.3,
    do_sample: true,
    top_k: 40,
    top_p: 0.9,
  })
  const text = Array.isArray(out) ? out[0]?.generated_text ?? '' : out.generated_text ?? ''
  return text
}
