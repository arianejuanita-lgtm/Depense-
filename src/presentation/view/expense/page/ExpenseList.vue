<script setup lang="ts">
import { ref } from 'vue';
import ExpensiveItem from "./ExpensiveItem.vue";
import BouttonAddExpense from "./BouttonAddExpense.vue";
import SearchLabelExpense from "./SearchLabelExpense.vue";
import SearchAmountExpense from "./SearchAmountExpense.vue";
import SearchDateExpense from "./SearchDateExpense.vue";
import AddExpense from "./AddExpense.vue"; 

const isAddModalOpen = ref(false);
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

  <div><ExpensiveItem /></div>

  <AddExpense v-model:open="isAddModalOpen" />
</template>