import type { AgentInputItem } from '@openai/agents'
import { randomUUID } from 'node:crypto'

const memory = new Map<string, AgentInputItem[]>()

export function generateConversationId(): string {
  // 24 chars for easier handling/URLs
  return `conv_${randomUUID().replace(/-/g, '').slice(0, 24)}`
}

export function getHistory(conversationId: string): AgentInputItem[] {
  return memory.get(conversationId) ?? []
}

export function setHistory(conversationId: string, history: AgentInputItem[]): void {
  memory.set(conversationId, history)
}

export function resetHistory(conversationId: string): void {
  memory.delete(conversationId)
}


