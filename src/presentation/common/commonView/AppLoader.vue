<script setup lang="ts">
defineProps<{
  show: boolean;
  text?: string; 
}>();
</script>

<template>
  <Transition name="fade">
    <div 
      v-if="show" 
      class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs"
    >
      <div class="bg-white p-5 rounded-2xl shadow-xl flex flex-col items-center gap-3 border border-gray-100">
        <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        
        <span v-if="text" class="text-sm font-medium text-gray-700 animate-pulse">
          {{ text }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>