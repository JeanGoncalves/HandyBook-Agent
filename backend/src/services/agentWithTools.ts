import { Agent } from '@openai/agents'
import { helloTool, searchProfessionalsTool, createProfessionalTool, updateProfessionalTool, deleteProfessionalTool } from '../tools'

export async function createHandybookAgent() {
  const agent = new Agent({
    name: 'Handybook Agent (tools in-process)',
    instructions:
      'Você é um concierge. Use as ferramentas para buscar, criar, atualizar e remover profissionais conforme a intenção do usuário.',
    tools: [
      helloTool,
      searchProfessionalsTool,
      createProfessionalTool,
      updateProfessionalTool,
      deleteProfessionalTool,
    ],
  })
  return { agent }
}


