import { Router } from 'express'
import { Runner, user } from '@openai/agents'
import { createHandybookAgentWithMCP } from '../services/agentWithMcp'
import { generateConversationId, getHistory, setHistory } from '../services/conversationStore'

export const agentRoutes = Router()

agentRoutes.post('/agent', async (req, res) => {
  try {
    const input: string = (req.body?.messageText || req.body?.message || '').toString()
    let conversationId: string = (req.body?.conversationId || '').toString()
    if (!conversationId) {
      conversationId = generateConversationId()
    }
    // Fallback removido: sempre usar o agente com MCP

    const { agent, mcpServer } = await createHandybookAgentWithMCP()
    try {
      // Recupera histórico existente e adiciona a nova entrada do usuário
      const history = getHistory(conversationId)
      const updatedHistory = [...history, user(input)]

      // Usa Runner com groupId para relacionar os runs dessa conversa
      const runner = new Runner({ groupId: conversationId })
      const result = await runner.run(agent as any, updatedHistory as any)

      // Persiste o histórico retornado pelo run (inclui tool calls e mensagens do assistente)
      setHistory(conversationId, result.history as any)

      res.json({
        conversationId,
        finalOutput: result.finalOutput,
        newItems: result.newItems,
        history: result.history,
      })
    } finally {
      await mcpServer.close()
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    res.status(500).json({ message: 'Erro ao executar agente com MCP', error: msg })
  }
})


