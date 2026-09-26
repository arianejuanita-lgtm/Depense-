<script setup lang="ts">
import { ref, computed } from 'vue';
import { Pencil, Trash2, CheckCircle2, Calendar, DollarSign, FolderTree, Tag, Clock } from 'lucide-vue-next';
import { useExpense } from '../store/UseExpense';
import { useCategory } from '@/presentation/view/category/store/UseCategory';
import ExpenseDetailItem from '@/presentation/common/commonView/ExpenseDetailItem.vue';
import AppButton from '@/presentation/common/commonView/AppButton.vue';
import DialogExpense from '@/presentation/common/commonView/DialogExpense.vue';

const props = defineProps<{
  id: number;
}>();

const emit = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
  (e: 'confirm', id: number): void;
}>();

const expenseStore = useExpense();
const categoryStore = useCategory();

const isDeleteModalOpen = ref(false);

const currentExpense = computed(() => {
  return expenseStore.expenses.find(element => element.id === props.id);
});

const currentCategory = computed(() => {
  if (!currentExpense.value) return null;
  return categoryStore.categories.find(cat => cat.id === currentExpense.value?.categoryId);
});

const confirmDelete = () => {
  if (currentExpense.value) {
    emit('delete', currentExpense.value.id);
  }
  isDeleteModalOpen.value = false;
};
</script>

<template>
  <div v-if="currentExpense" class="w-full max-w-md mx-auto bg-blanc dark:bg-gray-900 border border-bleu-clair dark:border-gray-800 rounded-2xl shadow-xl p-6 space-y-6 font-inter">
    
    <div class="flex items-start justify-between gap-4 border-b border-bleu-clair/40 dark:border-gray-800 pb-4">
      <div class="space-y-1">
        <span class="text-xs font-semibold text-bleu-fon dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Tag class="w-3.5 h-3.5" /> Libellé
        </span>
        <h2 class="text-xl font-bold text-texte dark:text-gray-100">
          {{ currentExpense.label }}
        </h2>
      </div>

      <div>
        <span 
          v-if="currentExpense.status === 'CONFIRMED'"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        >
          <CheckCircle2 class="w-3.5 h-3.5" /> Confirmé
        </span>
        <span 
          v-else
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        >
          <Clock class="w-3.5 h-3.5" /> Non confirmé
        </span>
      </div>
    </div>

    <div class="space-y-4">
      <ExpenseDetailItem 
        :icon="DollarSign" 
        label="Montant" 
        :value="`${currentExpense.amount.toFixed(0)} Fcfa`" 
        value-class="font-bold text-lg"
      />

      <ExpenseDetailItem 
        :icon="FolderTree" 
        label="Catégorie" 
        :value="currentCategory?.label || 'Aucune catégorie'" 
        value-class="font-semibold"
      />

      <ExpenseDetailItem 
        :icon="Calendar" 
        label="Date" 
        :value="currentExpense.date" 
      />
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-bleu-clair/40 dark:border-gray-800">
      <div class="flex items-center gap-2">
        <AppButton 
          type="button"
          variant="ghost"
          @click="$emit('edit', currentExpense.id)"
          custom-class="p-2.5 h-auto rounded-xl border border-bleu-clair dark:border-gray-700 text-bleu-fon dark:text-gray-300 hover:bg-bleu-clair/20 dark:hover:bg-gray-800"
          title="Modifier"
        >
          <Pencil class="w-4 h-4" />
        </AppButton>
        
        <AppButton 
          type="button"
          variant="ghost"
          @click="isDeleteModalOpen = true"
          custom-class="p-2.5 h-auto rounded-xl border border-red-200 dark:border-red-900/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
          title="Supprimer"
        >
          <Trash2 class="w-4 h-4" />
        </AppButton>
      </div>

      <AppButton 
        v-if="currentExpense.status === 'UNCONFIRMED'"
        type="button"
        @click="$emit('confirm', currentExpense.id)"
        custom-class="bg-bleu-prin text-blanc hover:bg-bleu-fon font-semibold text-sm shadow-sm transition-colors flex items-center gap-2"
      >
        <CheckCircle2 class="w-4 h-4" />
        Confirmer
      </AppButton>
    </div>

    <DialogExpense 
      v-model:open="isDeleteModalOpen"
      title="Confirmer la suppression"
      description="Voulez-vous vraiment supprimer cette dépense ? Cette action est irréversible."
      confirmText="Oui, supprimer"
      cancelText="Annuler"
      @confirm="confirmDelete"
    />

  </div>

  <div v-else class="text-center py-8 text-sm text-gray-500">
    Dépense introuvable.
  </div>
</template>