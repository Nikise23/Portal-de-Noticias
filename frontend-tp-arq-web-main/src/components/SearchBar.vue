<template>
  <div class="search-container">
    <button @click="toggleSearch" class="btn-busqueda">
      <i class="bi bi-search"></i>
    </button>

    <div v-if="isOpen" class="search-overlay">
      <div class="search-field-wrapper">
        <input
          type="text"
          placeholder="Escribe tu término de búsqueda y presiona Enter."
          class="search-input"
          v-model="searchTerm"
          @keyup.enter="performSearch"
        />
        <button class="btn-cerrar-busqueda" @click="closeSearch">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
const searchTerm = ref('')

const toggleSearch = () => {
  isOpen.value = !isOpen.value

  if (isOpen.value) {
    searchTerm.value = ''
  }
}

const closeSearch = () => {
  isOpen.value = false
}

const performSearch = () => {
  const term = searchTerm.value.trim()
  if (term !== '') {
    closeSearch()
    // Navegar a la ruta de búsqueda con el término como query parameter
    router.push({ name: 'busqueda', query: { q: term } })
  }
}
</script>

<style scoped>
.search-container {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.btn-busqueda {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 0 10px 0 0;
}

.btn-busqueda .bi-search {
  font-size: 24px;
  line-height: 1;
}

.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 15px 0;
  background-color: white;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-field-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  align-items: center;
}

.search-input {
  flex-grow: 1;
  padding: 10px 15px;
  font-size: 1.2em;
  border: 2px solid #ddd;
  border-radius: 4px;
  outline: none;
}
.search-input:focus {
  border-color: #0056b3;
}

.btn-cerrar-busqueda {
  background: none;
  border: none;
  font-size: 1.8em;
  color: #555;
  cursor: pointer;
  margin-left: 15px;
}
</style>
