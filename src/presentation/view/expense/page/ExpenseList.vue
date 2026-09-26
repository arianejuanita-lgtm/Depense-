<script setup lang="ts">
import ExpensiveItem from "./ExpensiveItem.vue";
import BouttonAddExpense from "./BouttonAddExpense.vue";
import SearchLabelExpense from "./SearchLabelExpense.vue";
import SearchAmountExpense from "./SearchAmountExpense.vue";
import SearchDateExpense from "./SearchDateExpense.vue";
</script>
<template>
  <div class="flex flex-row items-center justify-between w-full gap-4">
    <div class="flex items-center gap-2">
      <SearchDateExpense />
      <SearchAmountExpense />
    </div>

    <div class="flex items-center gap-2">
      <SearchLabelExpense />
      <BouttonAddExpense />
    </div>
  </div>
  <div><ExpensiveItem /></div>
</template>
