<script lang="ts" setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { Tag, DollarSign, FolderTree, Calendar } from 'lucide-vue-next';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import AppInput from '@/presentation/common/commonView/AppInput.vue';
import AppButton from '@/presentation/common/commonView/AppButton.vue';
import DialogExpense from '@/presentation/common/commonView/DialogExpense.vue';
import { useCategory } from '@/presentation/view/category/store/UseCategory';
import type { IExpense } from '@/domain/Expenses';
import { useExpense } from '../store/UseExpense';

const expenseStore = useExpense();
const categoryStore = useCategory();

const props = defineProps<{
  open: boolean; 
  initialData?: IExpense | null;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'submit', values: any): void;
}>();

const isConfirmationOpen = ref(false);
const pendingValues = ref<any>(null);

const expenseSchema = toTypedSchema(
  z.object({
    label: z.string().min(1, { message: 'Le libellé est requis' }),
    amount: z.coerce.number().positive({ message: 'Le montant doit être supérieur à 0' }),
    categoryId: z.coerce.number().min(1, { message: 'Veuillez sélectionner une catégorie' }),
    date: z.string().min(1, { message: 'La date est requise' }),
  })
);

const initialValues = props.initialData ? {
  label: props.initialData.label,
  amount: props.initialData.amount,
  categoryId: props.initialData.categoryId,
  date: props.initialData.date,
} : {
  label: '',
  amount: 0,
  categoryId: 0,
  date: new Date().toISOString().split('T')[0],
};

const handleClose = () => {
  emit('update:open', false);
};

const handleFormSubmit = (values: any) => {
  const finalValues = {
    ...values,
    status: props.isEditing && props.initialData ? props.initialData.status : 'UNCONFIRMED',
  };
  
  pendingValues.value = finalValues;
  isConfirmationOpen.value = true; 
};

const confirmAndSave = () => {
  if (!pendingValues.value) return;

  if (props.isEditing && props.initialData) {
    const updatedValues: IExpense = {
      ...props.initialData,
      ...pendingValues.value,
    };
    expenseStore.updatedExpense(updatedValues);
    emit('submit', updatedValues);
  } else {
    expenseStore.addedExpense(pendingValues.value as IExpense);
    emit('submit', pendingValues.value);
  }

  isConfirmationOpen.value = false;
  pendingValues.value = null;
  handleClose(); 
};
</script>

<template>
  <Dialog :open="open" @update:open="(val) => emit('update:open', val)">
    <DialogContent class="w-[92vw] max-w-[425px] max-h-[90vh] overflow-y-auto bg-blanc dark:bg-gray-900 border border-bleu-clair dark:border-gray-800 rounded-2xl shadow-xl p-6">
      <DialogHeader>
        <DialogTitle class="font-inter font-bold text-texte dark:text-gray-100 text-lg">
          {{ isEditing ? 'Modifier la dépense' : 'Ajouter une dépense' }}
        </DialogTitle>
        <DialogDescription class="font-poppins text-xs text-bleu-fon dark:text-gray-400">
          Remplissez les informations ci-dessous pour enregistrer la dépense.
        </DialogDescription>
      </DialogHeader>

      <Form :validation-schema="expenseSchema" :initial-values="initialValues" @submit="handleFormSubmit" class="space-y-4 py-2">
        <AppInput 
          name="label"
          label="Libellé"
          placeholder="Ex: Transport, Repas..." 
          :icon="Tag"
        />

        <AppInput 
          name="amount"
          label="Montant (Fcfa)"
          type="number"
          placeholder="0" 
          :icon="DollarSign"
        />

        <div class="flex flex-col gap-1 w-full">
          <label class="font-inter text-xs font-semibold text-texte dark:text-gray-300">Catégorie</label>
          <div class="relative flex items-center">
            <FolderTree class="absolute left-3 w-4 h-4 text-bleu-fon dark:text-gray-400 shrink-0 pointer-events-none z-10" />
            <Field name="categoryId" v-slot="{ field, meta }">
              <select 
                v-bind="field"
                class="w-full h-10 pl-9 pr-3 bg-blanc dark:bg-gray-800 border border-bleu-clair dark:border-gray-700 text-texte dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-bleu-prin rounded-xl text-sm font-inter"
                :class="meta.touched && !meta.valid ? 'border-red-500' : ''"
              >
                <option :value="0" disabled>Sélectionner une catégorie</option>
                <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
                  {{ cat.label }}
                </option>
              </select>
            </Field>
          </div>
          <ErrorMessage name="categoryId" class="text-[10px] text-red-500 font-inter" />
        </div>

        <AppInput 
          name="date"
          label="Date"
          type="date"
          :icon="Calendar"
        />

        <div class="pt-4 flex gap-2 justify-end">
          <AppButton 
            type="button" 
            variant="ghost" 
            @click="handleClose"
            custom-class="text-texte dark:text-gray-300 hover:bg-bleu-clair/20"
          >
            Annuler
          </AppButton>
          <AppButton 
            type="submit"
            custom-class="bg-bleu-prin text-blanc hover:bg-bleu-fon transition-colors"
          >
            {{ isEditing ? 'Mettre à jour' : 'Ajouter' }}
          </AppButton>
        </div>
      </Form>

      <DialogExpense 
        v-model:open="isConfirmationOpen"
        :title="isEditing ? 'Confirmer la modification' : 'Confirmer l\'ajout'"
        :description="isEditing ? 'Voulez-vous vraiment enregistrer ces modifications ?' : 'Voulez-vous vraiment ajouter cette nouvelle dépense ?'"
        confirmText="Oui, valider"
        cancelText="Annuler"
        @confirm="confirmAndSave"
      />
    </DialogContent>
  </Dialog>
</template>