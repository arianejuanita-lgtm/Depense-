<script setup lang="ts">
import { ref, watch } from 'vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
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
import { formatAmount  } from '@/presentation/common/commonFunction/formatters';

const expenseStore = useExpense();
const categoryStore = useCategory();

const props = defineProps<{
  open: boolean; 
  initialData?: IExpense | null;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'submit', expenseId: number): void;
}>();

const expenseZodSchema = z.object({
  label: z.string().min(1, { message: 'Le libellé est requis' }),
  amount: z.coerce.number().positive({ message: 'Le montant doit être supérieur à 0' }),
  categoryId: z.coerce.number().min(0, { message: 'Veuillez sélectionner une catégorie' }),
  date: z.string().min(1, { message: 'La date est requise' }),
});

type ExpenseFormValues = z.infer<typeof expenseZodSchema>;

const validationSchema = toTypedSchema(expenseZodSchema);

const isConfirmationOpen = ref(false);
const pendingValues = ref<Omit<IExpense, 'id'> | null>(null);

const getValues = (): ExpenseFormValues => {
  if (props.isEditing && props.initialData) {
    return {
      label: props.initialData.label,
      amount: Number(props.initialData.amount),
      categoryId: props.initialData.categoryId ? Number(props.initialData.categoryId) : 0,
      date: props.initialData.date,
    };
  }
  return {
    label: '',
    amount: 0,
    categoryId: 0,
    date: new Date().toISOString(),
  };
};

const { resetForm, setValues, values } = useForm({
  validationSchema,
  initialValues: getValues(),
});

watch(() => [props.open, props.initialData], ([isOpen]) => {
  if (isOpen) {
    const newValues = getValues();
    resetForm({
      values: newValues,
    });
    setValues(newValues);
  }
}, { immediate: true });

const handleClose = () => {
  emit('update:open', false);
};

const handleFormSubmit = (formValues: Record<string, unknown>) => {
  const typedValues = formValues as unknown as ExpenseFormValues;

  const finalValues: Omit<IExpense, 'id'> = {
    ...typedValues,
    status: props.isEditing && props.initialData ? props.initialData.status : 'UNCONFIRMED',
  };
  
  pendingValues.value = finalValues;
  isConfirmationOpen.value = true; 
};

const confirmAndSave = () => {
  if (!pendingValues.value) return;

  let targetId: number;

  if (props.isEditing && props.initialData) {
    targetId = props.initialData.id;
    const updatedValues: IExpense = {
      id: targetId,
      ...pendingValues.value,
    };
    expenseStore.updatedExpense(updatedValues);
    emit('submit', targetId); 
  } else {
    targetId = expenseStore.addedExpense(pendingValues.value);
    emit('submit', targetId); 
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

      <Form 
        v-if="open" 
        :validation-schema="validationSchema" 
        :initial-values="getValues()"
        @submit="handleFormSubmit" 
        class="space-y-4 py-2"
      >
        <AppInput 
          name="label"
          label="Libellé"
          placeholder="Ex: Transport, Repas..." 
          :icon="Tag"
        />

        <div class="space-y-1">
          <AppInput 
            name="amount"
            label="Montant (Fcfa)"
            type="number"
            placeholder="0" 
            :icon="DollarSign"
          />
          <p v-if="values.amount && values.amount > 0" class="text-[11px] text-bleu-fon dark:text-gray-400 font-inter px-1">
            Aperçu : <span class="font-semibold">{{ formatAmount(values.amount) }} Fcfa</span>
          </p>
        </div>

       <div class="flex flex-col gap-1 w-full">
          <label class="font-inter text-xs font-semibold text-texte dark:text-gray-300">Catégorie</label>
          <div class="relative flex items-center">
            <FolderTree class="absolute left-3 w-4 h-4 text-bleu-fon dark:text-gray-400 shrink-0 pointer-events-none z-10" />
            <Field name="categoryId" v-slot="{ field, meta }">
              <select 
                :value="field.value"
                @change="field.onChange"
                @blur="field.onBlur"
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
        :description="isEditing ? `Voulez-vous vraiment enregistrer cette dépense de ${formatAmount(pendingValues?.amount || 0)} Fcfa ?` : `Voulez-vous vraiment ajouter cette nouvelle dépense de ${formatAmount(pendingValues?.amount || 0)} Fcfa ?`"
        confirmText="Oui, valider"
        cancelText="Annuler"
        @confirm="confirmAndSave"
      />
    </DialogContent>
  </Dialog>
</template>