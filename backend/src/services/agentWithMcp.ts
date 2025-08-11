import { Agent, MCPServerStdio } from '@openai/agents'

export async function createHandybookAgentWithMCP() {
  const fullCommand = process.env.MCP_MOCK_FULL_COMMAND
  const command = process.env.MCP_MOCK_CMD
  const args = process.env.MCP_MOCK_ARGS?.split(' ').filter(Boolean)
  const env = {
    ...process.env,
    MOCK_API_BASE_URL: process.env.MOCK_API_BASE_URL || 'http://localhost:3001',
  } as Record<string, string>

  const mcpServer = new MCPServerStdio(
    fullCommand
      ? { fullCommand, env, name: 'mcp-mock-api' }
      : { command: command || 'node', args: args || [], env, name: 'mcp-mock-api' }
  )

  await mcpServer.connect()

  const agent = new Agent({
    name: 'Handybook MCP Agent',
    instructions: `Você é um concierge.
    Quando o usuário pedir profissionais, use as ferramentas MCP. Você pode listar os profissionais, pode também criar um novo, alterar e até excluir um profissional.
    Quando o usuário pedir para criar um profissional, use a ferramenta create_professional.
    Quando o usuário pedir para atualizar um profissional, use a ferramenta update_professional.
    Quando o usuário pedir para excluir um profissional, use a ferramenta delete_professional.
    Quando o usuário pedir para listar os profissionais, use a ferramenta list_professionals.
    Quando o usuário pedir para buscar um profissional, use a ferramenta search_professionals.
    Sempre mostre um profissional para o usuário. mesmo que ele não tenha encontrado um profissional. Use como sugestão alguma coisa que tenha dito.
    `,
    mcpServers: [mcpServer],
  })

  return { agent, mcpServer }
}


