import { Router } from 'express'
import { Runner, user } from '@openai/agents'
import { createHandybookAgent } from '../services/agentWithTools'
import { generateConversationId, getHistory, setHistory } from '../services/conversationStore'

export const agentRoutes = Router()

agentRoutes.post('/agent', async (req, res) => {
  try {
    const input: string = (req.body?.messageText || req.body?.message || '').toString()
    let conversationId: string = (req.body?.conversationId || '').toString()
    if (!conversationId) {
      conversationId = generateConversationId()
    }
    // Log entrada do usuário
    console.log(
      `[agent] incoming | ts=${new Date().toISOString()} | conv=${conversationId} | user="${input}"`
    )
    // Fallback removido: sempre usar o agente com MCP

    const { agent } = await createHandybookAgent()
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

      // Log saída do assistente
      const out = typeof result.finalOutput === 'string' ? result.finalOutput : String(result.finalOutput)
      const preview = out.length > 300 ? `${out.slice(0, 300)}…` : out
      console.log(
        `[agent] outgoing | ts=${new Date().toISOString()} | conv=${conversationId} | assistant="${preview}"
[agent] items=${Array.isArray(result.newItems) ? result.newItems.length : 0}`
      )
    } finally {
      // nada a fechar: tools em-processo
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error(
      `[agent] error   | ts=${new Date().toISOString()} | err=${msg}`
    )
    res.status(500).json({ message: 'Erro ao executar agente com MCP', error: msg })
  }
})


