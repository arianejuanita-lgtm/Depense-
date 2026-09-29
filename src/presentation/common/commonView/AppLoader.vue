<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    message?: string
    fullScreen?: boolean
  }>(),
  {
    message: 'Chargement en cours...',
    fullScreen: true
  }
)
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50 transition-all duration-300',
      fullScreen ? 'fixed inset-0' : 'w-full h-full py-12'
    ]"
  >
    <Loader2 class="w-10 h-10 text-bleu-600 animate-spin" />
    
    <p v-if="message" class="mt-3 text-sm font-medium text-gray-600 animate-pulse">
      {{ message }}
    </p>
  </div>
</template>