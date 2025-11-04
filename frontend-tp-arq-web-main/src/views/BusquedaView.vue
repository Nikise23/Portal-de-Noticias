<template>
  <div>
    <PortalHeader />

    <main class="busqueda-container">
      <div class="busqueda-header">
        <h1 class="busqueda-titulo">
          Resultados de búsqueda
          <span v-if="searchTerm" class="busqueda-termino">"{{ searchTerm }}"</span>
        </h1>
        <p v-if="!loading && !error" class="busqueda-contador">
          {{ totalResults }} {{ totalResults === 1 ? 'resultado encontrado' : 'resultados encontrados' }}
        </p>
      </div>

      <div v-if="loading" class="busqueda-loading">
        <p>Cargando resultados...</p>
      </div>

      <div v-if="error" class="busqueda-error">
        <p>Error al realizar la búsqueda: {{ error.message }}</p>
      </div>

      <div v-if="!loading && !error && articulos.length === 0" class="busqueda-vacio">
        <p>No se encontraron artículos para "{{ searchTerm }}"</p>
        <p class="busqueda-sugerencia">Intenta con otros términos de búsqueda.</p>
      </div>

      <section v-if="!loading && !error && articulos.length > 0" class="busqueda-resultados">
        <ArticuloCard
          v-for="articulo in articulos"
          :key="articulo.slug || articulo._id"
          :articulo="articulo"
          tipo-vista="secundaria-columna"
        />
      </section>

      <!-- Paginación -->
      <div v-if="!loading && !error && articulos.length > 0 && pagination.totalPages > 1" class="busqueda-paginacion">
        <button
          @click="goToPage(pagination.currentPage - 1)"
          :disabled="!pagination.hasPrevPage"
          class="btn-paginacion"
        >
          Anterior
        </button>
        <span class="paginacion-info">
          Página {{ pagination.currentPage }} de {{ pagination.totalPages }}
        </span>
        <button
          @click="goToPage(pagination.currentPage + 1)"
          :disabled="!pagination.hasNextPage"
          class="btn-paginacion"
        >
          Siguiente
        </button>
      </div>
    </main>

    <footer class="portal-footer">
      <p>Todos Los Derechos Reservados &copy; 2025 InfoExpress</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import PortalHeader from '@/components/PortalHeader.vue'
import ArticuloCard from '@/components/ArticuloCard.vue'

const route = useRoute()
const searchTerm = ref('')
const articulos = ref([])
const loading = ref(false)
const error = ref(null)
const totalResults = ref(0)
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false
})

const fetchSearchResults = async (term, page = 1) => {
  if (!term || term.trim().length < 2) {
    error.value = { message: 'El término de búsqueda debe tener al menos 2 caracteres' }
    articulos.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE || ''}/api/articles/search?q=${encodeURIComponent(term)}&page=${page}&limit=10`
    )

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const jsonResponse = await response.json()

    if (!jsonResponse.success) {
      throw new Error(jsonResponse.message || 'Error en la búsqueda')
    }

    articulos.value = jsonResponse.data.articles || []
    totalResults.value = jsonResponse.data.pagination?.totalResults || 0
    pagination.value = {
      currentPage: jsonResponse.data.pagination?.currentPage || 1,
      totalPages: jsonResponse.data.pagination?.totalPages || 1,
      hasNextPage: jsonResponse.data.pagination?.hasNextPage || false,
      hasPrevPage: jsonResponse.data.pagination?.hasPrevPage || false
    }
  } catch (err) {
    console.error('Error al realizar la búsqueda:', err)
    error.value = err
    articulos.value = []
    totalResults.value = 0
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages && searchTerm.value) {
    fetchSearchResults(searchTerm.value, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Observar cambios en la query parameter 'q'
watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      searchTerm.value = newQuery
      fetchSearchResults(newQuery, 1)
    } else {
      articulos.value = []
      searchTerm.value = ''
    }
  },
  { immediate: true }
)

onMounted(() => {
  const queryTerm = route.query.q
  if (queryTerm) {
    searchTerm.value = queryTerm
    fetchSearchResults(queryTerm, 1)
  }
})
</script>

<style scoped>
.busqueda-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 30px;
}

.busqueda-header {
  margin-bottom: 40px;
  border-bottom: 2px solid #eee;
  padding-bottom: 20px;
}

.busqueda-titulo {
  font-size: 2.5em;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
}

.busqueda-termino {
  color: #006dff;
  font-weight: 600;
}

.busqueda-contador {
  font-size: 1.1em;
  color: #666;
  margin: 0;
}

.busqueda-loading,
.busqueda-error,
.busqueda-vacio {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.busqueda-error {
  color: #d32f2f;
}

.busqueda-sugerencia {
  font-size: 0.9em;
  color: #999;
  margin-top: 10px;
}

.busqueda-resultados {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.busqueda-paginacion {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
  padding: 30px 0;
  border-top: 1px solid #eee;
}

.btn-paginacion {
  background-color: #006dff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-paginacion:hover:not(:disabled) {
  background-color: #0056cc;
}

.btn-paginacion:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}

.paginacion-info {
  font-size: 1em;
  color: #666;
  font-weight: 500;
}

.portal-footer {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 30px;
  text-align: center;
  border-top: 1px solid #eee;
  color: #888;
  font-size: 0.9em;
  margin-top: 60px;
}
</style>


