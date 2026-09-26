<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { SunDim, Moon } from 'lucide-vue-next'; 
import { Button } from '@/components/ui/button';

const isDarkMode = ref(false);

onMounted(() => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
});

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};
</script>

<template>
  <Button 
    variant="outline" 
    size="icon" 
    @click="toggleTheme" 
    class="border-bleu-clair bg-blanc hover:bg-bleu-clair/30 dark:bg-gray-800 dark:border-gray-700 transition-colors cursor-pointer shadow-sm"
  >
    <Moon v-if="!isDarkMode" class="w-5 h-5 text-bleu-prin" />
    <SunDim v-else class="w-5 h-5 text-amber-500" />
    <span class="sr-only">Changer de thème</span>
  </Button>
</template>