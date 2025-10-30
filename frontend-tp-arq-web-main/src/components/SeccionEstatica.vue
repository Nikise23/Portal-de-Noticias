<template>
  <div class="seccion-placeholder">
    <h3>{{ titulo }}</h3>
    <p v-if="descripcion">{{ descripcion }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.seccion-placeholder {
  border: 1px dashed #ccc;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
}
.seccion-placeholder h3 {
  color: #333;
  margin-top: 0;
}
</style>
