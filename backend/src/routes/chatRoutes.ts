import { Router } from "express"
import { chatController } from "../controllers/chatController"

export const chatRoutes = Router()
chatRoutes.post("/chat", chatController)
