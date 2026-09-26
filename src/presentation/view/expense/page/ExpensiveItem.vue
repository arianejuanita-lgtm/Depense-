<script lang="ts" setup>
import { useGlobalFilter } from '@/presentation/common/commonFunction/UseGlobalFilter';
import ExpItem from '@/presentation/common/commonView/ExpItem.vue';

defineEmits<{
    (e: 'select', id: number): void;
}>();

const globalFilterStore = useGlobalFilter();
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 py-3">
        <div v-for="exp in globalFilterStore.expenses" :key="exp.id">
           <ExpItem :item="exp" @click="$emit('select', exp.id)" /> 
        </div>
    </div>
</template>