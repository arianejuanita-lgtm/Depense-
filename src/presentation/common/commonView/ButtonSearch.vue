<script setup lang="ts">
import { Button } from '@/components/ui/button';

defineProps<{
  variant?: 'outline' | 'ghost' | 'default' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  customClass?: string;
  title?: string;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <Button 
    :variant="variant || 'outline'" 
    :size="size || 'icon'" 
    @click="$emit('click')"
    :class="customClass"
    :title="title"
  >
    <slot />
  </Button>
</template>