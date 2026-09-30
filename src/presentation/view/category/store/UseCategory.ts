import { defineStore } from "pinia";
import { ref } from "vue";
import {CategororyRepository } from "@/data/repositories/CategoryRepository"; 
import { Category } from "@/domain/Category";

export const useCategory = defineStore('category', () => {
    const categoryRepo = new CategororyRepository();
    
    const categories = ref<Category[]>([]); 

    async function gettedCategories() {
        try {
            categories.value = await categoryRepo.getCategory();
            console.log("tableau des categories", categories.value);
        } catch (error) {
            console.log("error :", error);
        }
    }

    return {
        categories,
        gettedCategories
    }
});