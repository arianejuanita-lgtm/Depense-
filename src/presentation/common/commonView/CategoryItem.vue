<script setup lang="ts">
import type { ICategory } from '@/domain/Category';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { computed } from 'vue';

const props = defineProps<{
    category: ICategory;
    amount: number;
    value?: number; 
}>();

const model = defineModel<number[]>();

const toggleCategory = () => {
    if (props.value === undefined) return;
    
    const currentArray = model.value ?? [];
    const index = currentArray.indexOf(props.value);

    if (index > -1) {
        model.value = currentArray.filter(id => id !== props.value);
    } else {
        model.value = [...currentArray, props.value];
    }
};

const isSelected = computed(() => {
    return props.value !== undefined && (model.value ?? []).includes(props.value);
});
</script>

<template>
    <Card 
        @click="toggleCategory"
        class="min-w-[110px] max-w-[140px] h-1 relative flex items-center justify-center shadow-sm rounded-lg overflow-visible cursor-pointer transition-all duration-200"
        :class="[
            isSelected 
                ? 'border-2 border-bleu-prin bg-bleu-clair/20 dark:bg-gray-700/80 shadow-md' 
                : 'border border-bleu-clair dark:border-gray-700 bg-blanc dark:bg-gray-800 hover:border-bleu-prin/50'
        ]"
    >
        <div class="absolute inset-0 px-2 flex items-center justify-start gap-1.5">
            <Avatar class="w-5 h-5 rounded-sm shrink-0">
                <AvatarFallback class="bg-bleu-clair/50 dark:bg-gray-700 text-bleu-prin font-poppins font-bold text-[9px] rounded-sm">
                    {{ category.label.charAt(0).toUpperCase() }}
                </AvatarFallback>
            </Avatar>
            
            <div class="flex flex-col truncate gap-0.5">
                <p class="font-inter text-[9px] text-texte dark:text-gray-300 font-medium truncate">
                    {{ category.label }}
                </p>
                <p class="font-poppins font-bold text-[10px] text-bleu-fon dark:text-white truncate">
                    {{ Number(amount).toFixed(0) }} Fcfa
                </p>
            </div>
        </div>
    </Card>
</template>