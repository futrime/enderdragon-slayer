export default interface LLM {
  ask: (question: string) => Promise<string>
}
