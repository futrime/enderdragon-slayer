import type LLM from './LLM.js'
import OpenAI from 'openai'

export interface GPTOptions {
  modelID?: string
  openAIAPIKey?: string
  openAIBaseURL?: string
}

export default class GPT implements LLM {
  readonly modelID: string
  readonly openAIClient: OpenAI

  constructor (options: GPTOptions) {
    this.modelID = options.modelID ?? 'gpt-3.5-turbo'

    this.openAIClient = new OpenAI({
      apiKey: options.openAIAPIKey,
      baseURL: options.openAIBaseURL
    })
  }

  async ask (question: string): Promise<string> {
    const completion = await this.openAIClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: question
        }
      ],
      model: this.modelID
    })

    const answer = completion.choices[0].message.content

    if (answer === null) {
      throw new Error(`${this.modelID} could not answer the question: ${question}`)
    }

    return answer
  }
}
