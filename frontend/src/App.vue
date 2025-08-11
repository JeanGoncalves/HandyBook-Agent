<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type Role = 'user' | 'assistant'
interface Message {
  role: Role
  content: string
  time: number
}

const messages = ref<Message[]>([
  { role: 'assistant', content: 'Olá! Sou o concierge HandyBook. Posso te ajudar a encontrar profissionais por localização, preço e avaliação. Como posso ajudar hoje?', time: Date.now() },
])

const draft = ref('')
const canSend = computed(() => draft.value.trim().length > 0)

const menuOpen = ref(false)
const menuRoot = ref<HTMLElement | null>(null)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function onDocumentClick(e: MouseEvent) {
  if (!menuOpen.value) return
  const root = menuRoot.value
  const target = e.target as Node | null
  if (root && target && !root.contains(target)) {
    menuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
})

function send() {
  const text = draft.value.trim()
  if (!text) return

  messages.value.push({ role: 'user', content: text, time: Date.now() })
  draft.value = ''

  setTimeout(() => {
    messages.value.push({ role: 'assistant', content: 'Entendi. Em breve vou integrar com o mock-api para buscar profissionais e mostrar resultados aqui no chat.', time: Date.now() })
    scrollToBottom()
  }, 500)

  scrollToBottom()
}

function onClearConversation() {
  clearChat()
  menuOpen.value = false
}

function clearChat() {
  messages.value = [
    { role: 'assistant', content: 'Conversa limpa. Como posso ajudar?', time: Date.now() },
  ]
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    const el = document.getElementById('messages')
    if (el) el.scrollTop = el.scrollHeight
  })
}

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="min-h-screen grid grid-rows-[auto,1fr] bg-gradient-to-b from-white to-gray-100">
    <header class="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
      <div class="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-brand-500 text-white grid place-items-center font-semibold">HB</div>
        <div>
          <h1 class="text-lg font-semibold text-gray-900">HandyBook Agent</h1>
          <p class="text-sm text-gray-500">Concierge de serviços — chat assistivo</p>
        </div>
      </div>
    </header>

    <main class="max-w-3xl w-full mx-auto px-4 py-6 grid grid-rows-[1fr,auto] gap-4">
      <section id="messages" class="space-y-4 overflow-y-auto pr-1">
        <div v-for="(m, idx) in messages" :key="idx" class="flex" :class="m.role === 'user' ? 'justify-end' : 'justify-start'">
          <div
            class="max-w-[80%] rounded-2xl px-4 py-2 shadow-sm"
            :class="m.role === 'user' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-white text-gray-900 rounded-bl-sm border'"
          >
            <p class="whitespace-pre-line leading-relaxed">{{ m.content }}</p>
            <span class="block mt-1 text-[11px] opacity-70">{{ formatTime(m.time) }}</span>
          </div>
        </div>
      </section>

      <form @submit.prevent="send" class="grid grid-cols-[1fr,auto] gap-2 items-end">
        <div class="relative" ref="menuRoot">
          <textarea
            v-model="draft"
            rows="1"
            placeholder="Digite sua mensagem..."
            class="block w-full resize-none rounded-xl border bg-white px-4 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            @keydown.enter.exact.prevent="send"
          />

          <!-- Menu de ações (3 pontinhos) -->
          <div class="absolute right-2 bottom-2 flex items-center gap-1">
            <button
              type="button"
              class="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              aria-haspopup="menu"
              :aria-expanded="menuOpen ? 'true' : 'false'"
              aria-label="Mais opções"
              @click="toggleMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M6.75 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm7.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm7.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>

            <div
              v-if="menuOpen"
              role="menu"
              class="absolute right-0 bottom-12 min-w-[180px] rounded-xl border bg-white shadow-lg overflow-hidden"
            >
              <button
                type="button"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                role="menuitem"
                @click="onClearConversation"
              >
                Limpar conversa
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          :disabled="!canSend"
          class="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-3 font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-700"
        >
          Enviar
        </button>
      </form>
    </main>
  </div>
</template>

<style scoped>
#messages {
  scrollbar-width: thin;
}
#messages::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
#messages::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.15);
  border-radius: 8px;
}
</style>
