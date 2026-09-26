<script setup lang="ts">
import Logo from '../common/commonView/Logo.vue';
import Mode from '../common/commonView/Mode.vue';
import CategoryList from './category/page/CategoryList.vue';
import TotalAmount from '../common/commonView/TotalAmount.vue';
import ExpenseList from './expense/page/ExpenseList.vue';
</script>

<template>
  <main class="min-h-screen  dark:bg-gray-900 text-texte dark:text-gray-100 font-inter m-2 sm:p-6 md:p-4 transition-colors duration-200">
    <div class="max-w-4xl mx-auto space-y-3 sm:space-y-3">

      <div class="flex items-center justify-between">
        <div class="scale-90 sm:scale-100 origin-left">
          <Logo />
        </div>
        <div class="scale-90 sm:scale-100 origin-right">
          <Mode />
        </div>
      </div>

      <div class="flex flex-row items-center justify-between gap-4 w-full">
  <div>
    <CategoryList />
  </div>
  <div class="flex justify-end">
    <TotalAmount />
  </div>
</div>

      <div >
        <ExpenseList />
      </div>

    </div>
  </main>
</template>