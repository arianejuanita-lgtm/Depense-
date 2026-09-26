<script lang="ts" setup>
import { AspectRatio } from "@/components/ui/aspect-ratio"
import logo from "../../../assets/logo.png"
</script>

<template>
  <div class="flex items-center gap-3 select-none">
    <div class="w-10 h-10 overflow-hidden rounded-lg shadow-sm border border-bleu-clair">
      <AspectRatio :ratio="1 / 1" class="w-full h-full">
        <img :src="logo" alt="Logo de l'application" class="object-cover w-full h-full">
      </AspectRatio>
    </div>

    <h1 class="font-poppins font-bold text-lg sm:text-xl text-bleu-fon tracking-wide dark:text-white">
      MES DEPENSES
    </h1>
  </div>
</template>