<script setup lang="ts">
import { Search } from '@lucide/vue';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

defineProps<{
  modelValue: string;
  placeholder?: string;
  autofocus?: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <InputGroup class="w-full">
    <InputGroupAddon>
      <Search class="w-4 h-4 text-gray-400" />
    </InputGroupAddon>
    <InputGroupInput 
      :modelValue="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :placeholder="placeholder || 'Rechercher...'" 
      class="text-sm"
      :autofocus="autofocus"
    />
  </InputGroup>
</template>