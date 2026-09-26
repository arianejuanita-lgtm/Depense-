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
import type { IExpense } from '@/domain/Expenses';

const expenseStore = useExpense();
const isAddModalOpen = ref(false);
const selectedExpenseId = ref<number | null>(null);

const editingExpenseData = ref<IExpense | null>(null);

const handleOpenDetail = (id: number) => {
  selectedExpenseId.value = id;
};

const handleOpenAdd = () => {
  editingExpenseData.value = null;
  isAddModalOpen.value = true;
};

const handleStartEditFromDetail = (id: number) => {
  const expenseToEdit = expenseStore.expenses.find(e => e.id === id);
  if (expenseToEdit) {
    selectedExpenseId.value = null; 
    editingExpenseData.value = expenseToEdit; 
    isAddModalOpen.value = true; 
  }
};

const handleFormSubmitted = (expenseId: number) => {
  isAddModalOpen.value = false;
  editingExpenseData.value = null;
  selectedExpenseId.value = expenseId; 
};

const handleConfirmExpense = (id: number) => {
  expenseStore.deletedExpense(id); 
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
      <BouttonAddExpense @click="handleOpenAdd" />
    </div>
  </div>

  <div>
    <ExpensiveItem @select="handleOpenDetail" />
  </div>

  <AddExpense 
    v-if="isAddModalOpen"
    :open="isAddModalOpen" 
    @update:open="(val) => isAddModalOpen = val"
    :initial-data="editingExpenseData"
    :is-editing="!!editingExpenseData"
    @submit="handleFormSubmitted" 
  />

  <Dialog :open="selectedExpenseId !== null" @update:open="(val) => !val && (selectedExpenseId = null)">
    <DialogContent class="w-[92vw] max-w-md bg-transparent border-none shadow-none p-0">
      <DetailExpense 
        v-if="selectedExpenseId !== null" 
        :id="selectedExpenseId"
        @confirm="handleConfirmExpense"
        @delete="handleDeleteExpense"  
        @edit="handleStartEditFromDetail"
      />
    </DialogContent>
  </Dialog>
</template>