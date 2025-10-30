<template>
  <router-link
    :to="{ name: 'articulo-detalle', params: { slug: articulo.slug } }"
    :class="['articulo-card', tipoVista]"
  >
    <img :src="articulo.imagenUrl" :alt="articulo.title" class="articulo-imagen" />

    <div class="articulo-contenido">
      <h3 class="articulo-titulo">{{ articulo.title }}</h3>

      <p
        v-if="tipoVista === 'principal-grande' || tipoVista === 'secundaria-columna'"
        class="articulo-resumen"
      >
        {{ articulo.excerpt }}
      </p>

      <p class="articulo-meta">
        <span v-if="tipoVista !== 'miniatura-card'" class="autor">{{ articulo.author }}</span>
      </p>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  articulo: {
    type: Object,
    required: true,
  },
  tipoVista: {
    type: String,
    default: 'principal',
  },
})
</script>

<style scoped>
.articulo-card {
  display: block;
  margin-bottom: 25px;
  padding-bottom: 15px;
}

.articulo-imagen {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 15px;
}

.articulo-titulo {
  font-size: 1.25em;
  color: #1a1a1a;
  margin-top: 0;
  line-height: 1.2;
}

.articulo-resumen {
  color: #555;
  font-size: 0.95em;
  line-height: 1.5;
}

.articulo-meta {
  font-size: 0.8em;
  color: #888;
}

.articulo-card.grande {
  border-bottom: 1px solid #eee;
  padding-bottom: 25px;
  margin-bottom: 20px;
}

.articulo-card.grande .articulo-imagen {
  max-height: 550px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.articulo-card.grande .articulo-titulo {
  font-size: 2.8em;
  font-weight: bold;
}

.articulo-card.secundaria-lateral {
  display: block;
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.articulo-card.secundaria-lateral .articulo-imagen {
  width: 100%;
  max-height: 250px;
  margin-right: 0;
  margin-bottom: 10px;
  border-radius: 5px;
}

.articulo-card.secundaria-lateral .articulo-titulo {
  font-size: 1.15em;
  line-height: 1.4;
  font-weight: bold;
}

.articulo-card.secundaria-lateral .articulo-meta {
  font-weight: bold;
  color: #888;
}

.articulo-card.miniatura-card {
  display: block;
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.articulo-card.miniatura-card .articulo-imagen {
  width: 100%;
  max-height: 120px;
  object-fit: cover;
  border-radius: 5px;
}

.articulo-card.miniatura-card .articulo-titulo {
  font-size: 1em;
  margin-top: 10px;
  line-height: 1.2;
  font-weight: bold;
}

.articulo-card.principal-grande {
  border-bottom: 1px solid #ddd;
  padding-bottom: 30px;
  margin-bottom: 30px;
  grid-column: 1 / -1;
}

.articulo-card.principal-grande .articulo-imagen {
  max-height: 500px;
  margin-bottom: 20px;
  border-radius: 6px;
}

.articulo-card.principal-grande .articulo-titulo {
  font-size: 3em;
  line-height: 1.1;
  font-weight: 700;
}

.articulo-card.principal-grande .articulo-resumen {
  display: block;
  font-size: 1.2em;
  margin-top: 10px;
}

.articulo-card.secundaria-columna {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  align-items: flex-start;
  gap: 15px;
}

.articulo-card.secundaria-columna .articulo-imagen {
  width: 35%;
  min-width: 150px;
  max-height: 120px;
  margin-bottom: 0;
  border-radius: 4px;
}

.articulo-card.secundaria-columna .articulo-contenido {
  width: 65%;
}

.articulo-card.secundaria-columna .articulo-titulo {
  font-size: 1.2em;
  line-height: 1.3;
  font-weight: 600;
}
</style>
