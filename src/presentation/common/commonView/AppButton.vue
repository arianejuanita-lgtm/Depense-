<script setup lang="ts">
import { Button } from '@/components/ui/button';

interface Props {
    variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    customClass?: string;
}

withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'default',
    customClass: '',
});
</script>

<template>
  <Button 
    :variant="variant" 
    :size="size"
    class="font-poppins transition-all duration-200 cursor-pointer"
    :class="[
      variant === 'default' ? 'bg-bleu-prin text-blanc hover:bg-bleu-fon dark:bg-blue-600 dark:hover:bg-blue-700' : '',
      customClass
    ]"
    v-bind="$attrs"
  >
    <slot />
  </Button>
</template>