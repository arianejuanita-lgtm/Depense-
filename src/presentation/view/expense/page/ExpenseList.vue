<script setup lang="ts">
import { ref } from 'vue';
import ExpensiveItem from "./ExpensiveItem.vue";
import BouttonAddExpense from "./BouttonAddExpense.vue";
import SearchLabelExpense from "./SearchLabelExpense.vue";
import SearchAmountExpense from "./SearchAmountExpense.vue";
import SearchDateExpense from "./SearchDateExpense.vue";
import AddExpense from "./AddExpense.vue"; 
import DetailExpense from "./DetailExpense.vue";
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useExpense } from '../store/UseExpense';

const expenseStore = useExpense();
const isAddModalOpen = ref(false);
const selectedExpenseId = ref<number | null>(null);

const handleOpenDetail = (id: number) => {
  selectedExpenseId.value = id;
};

// Déclenche l'affichage du détail dès que l'ajout ou la modification est validé
const handleFormSubmitted = (expenseId: number) => {
  isAddModalOpen.value = false;
  selectedExpenseId.value = expenseId;
};

const handleConfirmExpense = (id: number) => {
  const exp = expenseStore.expenses.find(e => e.id === id);
  if (exp) {
    exp.status = 'CONFIRMED';
    expenseStore.updatedExpense(exp);
  }
  selectedExpenseId.value = null;
};

const handleDeleteExpense = (id: number) => {
  expenseStore.deletedExpense(id);
  selectedExpenseId.value = null;
};
</script>

<template>
  <div class="flex flex-row items-center justify-between w-full gap-4">
    <div class="flex items-center gap-2">
      <SearchDateExpense />
      <SearchAmountExpense />
    </div>

    <div class="flex items-center gap-2">
      <SearchLabelExpense />
      <BouttonAddExpense @click="isAddModalOpen = true" />
    </div>
  </div>

  <div>
    <ExpensiveItem @select="handleOpenDetail" />
  </div>

  <AddExpense 
    v-model:open="isAddModalOpen" 
    @submit="handleFormSubmitted" 
  />

  <Dialog :open="selectedExpenseId !== null" @update:open="(val) => !val && (selectedExpenseId = null)">
    <DialogContent class="w-[92vw] max-w-md bg-transparent border-none shadow-none p-0">
      <DetailExpense 
        v-if="selectedExpenseId !== null" 
        :id="selectedExpenseId"
        @confirm="handleConfirmExpense"
        @delete="handleDeleteExpense"
        @edit="(id) => { selectedExpenseId = null;  }"
      />
    </DialogContent>
  </Dialog>
</template>