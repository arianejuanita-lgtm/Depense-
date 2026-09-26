<script setup lang="ts">
import type { ICategory } from '@/domain/Category';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

defineProps<{
    category: ICategory;
    amount: number;
}>();
</script>

<template>
    <Card class="min-w-[110px] max-w-[140px] h-1 relative flex items-center justify-center border-bleu-clair dark:border-gray-700 bg-blanc dark:bg-gray-800 shadow-sm rounded-lg overflow-visible">
        
        <div class="absolute inset-0 px-2 flex items-center justify-start gap-1.5">
            
            <Avatar class="w-5 h-5 rounded-sm shrink-0">
                <AvatarFallback class="bg-bleu-clair/50 dark:bg-gray-700 text-bleu-prin font-poppins font-bold text-[9px] rounded-sm">
                    {{ category.label.charAt(0).toUpperCase() }}
                </AvatarFallback>
            </Avatar>
            
            <div class="flex flex-col truncate leading-none">
                <p class="font-inter text-[9px] text-texte dark:text-gray-300 font-medium truncate">
                    {{ category.label }}
                </p>
                <p class="font-poppins font-bold text-[10px] text-bleu-fon dark:text-white truncate">
                    {{ Number(amount).toFixed(0) }}
                </p>
            </div>
            
        </div>
    </Card>
</template>