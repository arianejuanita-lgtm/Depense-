<script lang="ts" setup>
import { AspectRatio } from "@/components/ui/aspect-ratio"
import logo from "../../../assets/logo.png"
</script>

<template>
    <div class="inline-flex">
 <AspectRatio :ratio="16 / 9">
    <img :src="logo" alt="Image" class="rounded-md object-cover">
  </AspectRatio>
  <h1>MES DEPENSES</h1>
  </div>
</template>