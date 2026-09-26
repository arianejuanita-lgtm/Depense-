<script lang="ts" setup>
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import AppButton from '@/presentation/common/commonView/AppButton.vue';

defineProps<{
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean; 
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'confirm'): void;
}>();

const handleClose = () => {
  emit('update:open', false);
};

const handleConfirm = () => {
  emit('confirm');
  handleClose();
};
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="sm:max-w-[380px] bg-blanc dark:bg-gray-900 border border-bleu-clair dark:border-gray-800 rounded-2xl shadow-xl">
      <DialogHeader>
        <DialogTitle class="font-inter font-bold text-texte dark:text-gray-100 text-base">
          {{ title }}
        </DialogTitle>
        <DialogDescription class="font-poppins text-xs text-bleu-fon dark:text-gray-400 pt-1">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter class="pt-4 flex gap-2 justify-end">
        <AppButton 
          type="button" 
          variant="ghost" 
          @click="handleClose"
          custom-class="text-texte dark:text-gray-300 hover:bg-bleu-clair/20"
        >
          {{ cancelText || 'Annuler' }}
        </AppButton>
        <AppButton 
          type="button"
          @click="handleConfirm"
          :custom-class="isDanger 
            ? 'bg-red-500 text-blanc hover:bg-red-600 transition-colors' 
            : 'bg-bleu-prin text-blanc hover:bg-bleu-fon transition-colors'"
        >
          {{ confirmText || 'Confirmer' }}
        </AppButton>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>