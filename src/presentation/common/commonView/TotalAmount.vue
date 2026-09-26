<script lang="ts" setup>
import { useExpense } from '@/presentation/view/expense/store/UseExpense';
import { computed } from 'vue';

const expenseStore = useExpense();

const totalAmount = computed(() => {
    return expenseStore.expenses.reduce((acc, current) => acc + current.amount, 0);
});
</script>

<template>
    <div class="flex flex-col p-3 bg-blanc dark:bg-gray-800 border border-bleu-clair dark:border-gray-700 rounded-xl shadow-sm">
        <p class="font-inter text-xs text-texte dark:text-gray-300 font-medium">Total général</p>
        <p class="font-poppins font-bold text-lg text-bleu-fon dark:text-white">
            {{ Number(totalAmount).toFixed(0) }} FCFA
        </p>
    </div>
</template>