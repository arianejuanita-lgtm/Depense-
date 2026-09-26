<script setup lang="ts">
import { Plus } from '@lucide/vue';
import AppButton from '@/presentation/common/commonView/AppButton.vue'; 
</script>

<template>
  <AppButton 
    variant="default"
    customClass="bg-bleu-prin hover:bg-bleu-fon text-white flex items-center gap-2 shadow-sm"
  >
    <span class="flex md:hidden items-center justify-center">
      <Plus class="w-5 h-5" />
    </span>

    <span class="hidden md:flex items-center gap-2">
      <Plus class="w-4 h-4" />
      <span>Ajouter une dépense</span>
    </span>
  </AppButton>
</template>