import { defineStore } from "pinia";
import { ref } from "vue";
import {CategororyRepository } from "@/data/repositories/CategoryRepository"; 
import type { ICategory } from "@/domain/Category";

export const useCategory = defineStore('category', () => {
    const categoryRepo = new CategororyRepository();
    
    const categories = ref<ICategory[]>(categoryRepo.getCategory()); 

    function gettedCategories() {
        categories.value = categoryRepo.getCategory();
    }

    return {
        categories,
        gettedCategories
    }
});