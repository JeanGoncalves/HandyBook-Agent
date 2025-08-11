export function getBaseUrl(): string {
  return process.env.MOCK_API_BASE_URL || 'http://localhost:3001'
}

export async function httpJson(
  method: string,
  path: string,
  body?: unknown
): Promise<{ ok: boolean; status: number; text: string }> {
  const fetchFn: any = (globalThis as any).fetch
  const url = new URL(path, getBaseUrl()).toString()
  try {
    const resp = await fetchFn(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    try {
      const data = await resp.json()
      return {
        ok: !!resp.ok,
        status: Number(resp.status),
        text: typeof data === 'string' ? data : JSON.stringify(data),
      }
    } catch {
      const text = await resp.text()
      return { ok: !!resp.ok, status: Number(resp.status), text }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, status: 0, text: `Falha na requisição: ${msg}` }
  }
}


