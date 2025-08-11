import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { backendPort } from './config/env'
import { agentRoutes } from './routes/agentRoutes'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'handybook-agent-backend' })
})

app.use('/api', agentRoutes)

app.listen(backendPort, () => {
  console.log(`Backend running on http://localhost:${backendPort}`)
})
