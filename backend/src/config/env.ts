export const backendPort = process.env.PORT ? Number(process.env.PORT) : 3002
export const googleApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || ""
