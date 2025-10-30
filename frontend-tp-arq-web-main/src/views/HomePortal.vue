<template>
  <div>
    <PortalHeader />

    <main class="portal-principal-grid">
      <section class="columna-principal-noticia">
        <div class="seccion-principal-noticia">
          <ArticuloCard
            v-if="articuloDestacado"
            :key="articuloDestacado.slug || articuloDestacado._id"
            :articulo="articuloDestacado"
            tipo-vista="principal-grande"
          />

          <ArticuloCard
            v-for="articulo in articulosPrincipales"
            :key="articulo.slug || articulo._id"
            :articulo="articulo"
            tipo-vista="secundaria-columna"
          />
        </div>
      </section>

      <aside class="columna-lateral-feed">
        <ArticuloCard
          v-for="articulo in feedArticulos"
          :key="articulo.slug || articulo._id"
          :articulo="articulo"
          tipo-vista="secundaria-lateral"
        />
      </aside>
    </main>

    <section class="portal-fila-inferior">
      <ArticuloCard
        v-for="articulo in articulosFilaInferior"
        :key="articulo.slug || articulo._id"
        :articulo="articulo"
        tipo-vista="miniatura-card"
      />
    </section>

    <footer class="portal-footer">
      <p>Todos Los Derechos Reservados &copy; 2025 InfoExpress</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PortalHeader from '@/components/PortalHeader.vue'
import ArticuloCard from '@/components/ArticuloCard.vue'

const articuloDestacado = ref(null)
const articulosPrincipales = ref([])
const feedArticulos = ref([])
const articulosFilaInferior = ref([])

const fetchArticulos = async () => {
  try {
  const response = await fetch((import.meta.env.VITE_API_BASE || '') + '/api/articles?limit=15')

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const jsonResponse = await response.json()
    const articulos = jsonResponse.data.articles

    if (articulos && articulos.length > 0) {
      articuloDestacado.value = articulos[0]

      articulosPrincipales.value = articulos.slice(1, 3)

      feedArticulos.value = articulos.slice(3, 5)

      articulosFilaInferior.value = articulos.slice(5)
    }
  } catch (error) {
    console.error('Error al obtener los artículos de la API:', error)
  }
}

onMounted(() => {
  fetchArticulos()
})
</script>

<style scoped>
.portal-header-principal {
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}

.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-acciones {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-suscripcion {
  background-color: #006dff;
  color: #fff;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
}

.btn-suscripcion:hover {
  background-color: #0056cc;
}

.btn-ingreso {
  background-color: #fff;
  color: #333;
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-ingreso:hover {
  background-color: #f0f0f0;
}

.portal-nav-menu {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 40px;
  font-size: 0.9em;
  font-weight: bold;
}

.menu-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  align-items: center;
  gap: 20px;
}

.menu-inner a {
  text-decoration: none;
  color: #333;
  text-transform: uppercase;
}

.portal-header {
  border-bottom: 1px solid #eee;
  padding: 30px 0;
  margin-bottom: 40px;
}

.logo-y-nav {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.portal-nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.portal-principal-grid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;

  display: grid;
  grid-template-columns: 3fr 1.2fr;
  gap: 30px;
  margin-bottom: 50px;
}

.columna-principal-noticia {
  border-right: 1px solid #eee;
  padding-right: 30px;
}

.portal-fila-inferior {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  margin-bottom: 50px;
}

.portal-footer {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 30px;
  text-align: center;
  border-top: 1px solid #eee;
  color: #888;
  font-size: 0.9em;
}
</style>
