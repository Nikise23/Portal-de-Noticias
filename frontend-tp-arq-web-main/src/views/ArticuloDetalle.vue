<template>
  <div>
    <PortalHeader />

    <div class="articulo-detalle-container">
      <div v-if="loading" class="cargando">Cargando artículo...</div>

      <div v-else-if="error" class="error-msg">
        Error al cargar el artículo: {{ error.message }}
      </div>

      <div v-else-if="articulo" class="articulo-contenido-wrapper">
        <header class="articulo-header">
          <div class="metadata-y-tags-wrapper">
            <p class="articulo-tag">
              <span v-for="tag in articulo.tags" :key="tag" class="tag-badge">{{ tag }}</span>
            </p>
            <div class="articulo-metadata-social">
              <span class="social-contador vistas">
                <i class="bi bi-eye-fill"></i> {{ articulo.viewsCount || 0 }} Vistas
              </span>

              <span class="social-contador likes">
                <i class="bi bi-heart-fill"></i> {{ articulo.likesCount || 0 }} Me gusta
              </span>
            </div>
          </div>

          <h1 class="titulo-principal" v-html="tituloHTML"></h1>

          <p class="meta-data">
            Por <strong>{{ articulo.author }}</strong> | Publicado el
            {{ new Date(articulo.publishedAt).toLocaleDateString() }}
          </p>
        </header>

        <img
          :src="articulo.imagenUrl || '/default-image.jpg'"
          :alt="articulo.title"
          class="imagen-principal"
        />

        <section class="cuerpo-articulo" v-html="contenidoHTML"></section>

        <ComentariosSection :article-slug="articulo.slug" />

        <footer class="articulo-footer">
          <p>Todos Los Derechos Reservados &copy; 2025 InfoExpress</p>
        </footer>
      </div>
      <div v-else class="not-found">El artículo solicitado no fue encontrado.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import PortalHeader from '@/components/PortalHeader.vue'
import ComentariosSection from '@/components/ComentariosSection.vue'

const route = useRoute()

const articulo = ref(null)
const loading = ref(true)
const error = ref(null)
const contenidoHTML = ref('')

const tituloHTML = computed(() => {
  if (articulo.value && articulo.value.title) {
    return marked(articulo.value.title)
      .replace(/<\/?p[^>]*>/g, '')
      .trim()
  }
  return ''
})

const fetchArticuloDetalle = async (slug) => {
  loading.value = true
  error.value = null
  articulo.value = null
  contenidoHTML.value = ''
  try {
  const response = await fetch((import.meta.env.VITE_API_BASE || '') + `/api/articles/${slug}`)

    if (response.status === 404) {
      throw new Error('Artículo no encontrado (404)')
    }

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const jsonResponse = await response.json()
    articulo.value = jsonResponse.data.article

    if (articulo.value && articulo.value.content) {
      contenidoHTML.value = marked(articulo.value.content)
    }
  } catch (err) {
    console.error('Error al cargar el artículo:', err)
    error.value = err
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      fetchArticuloDetalle(newSlug)
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.articulo-detalle-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  overflow-x: hidden;
}

.articulo-header {
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
}

.metadata-y-tags-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
  justify-content: space-between;
}

.articulo-metadata-social {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 0.9em;
  color: #666;
  font-weight: 500;
}

.social-contador {
  display: flex;
  align-items: center;
  gap: 5px;
}

.social-contador i {
  font-size: 1.1em;
}

.articulo-tag {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-badge {
  display: inline-block;
  background-color: #006dff;
  color: white;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 0.8em;
  text-transform: uppercase;
  font-weight: bold;
}

.titulo-principal {
  color: #1a1a1a;
  font-size: 3.5em;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 15px;
  display: block;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.meta-data {
  font-size: 0.9em;
  color: #888;
}

.imagen-principal {
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 40px;
  border-bottom: 2px solid #eee;
  padding-bottom: 20px;
}

.cuerpo-articulo {
  font-size: 1.1em;
  line-height: 1.8;
  color: #333;
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cuerpo-articulo :deep(h2) {
  font-size: 1.8em;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  color: #1a1a1a;
}

.cuerpo-articulo :deep(h3) {
  font-size: 1.5em;
  font-weight: 600;
  margin-top: 30px;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.cuerpo-articulo :deep(p) {
  margin-bottom: 20px;
}

.cuerpo-articulo :deep(strong) {
  font-weight: 700;
}

.cuerpo-articulo :deep(ul),
.cuerpo-articulo :deep(ol) {
  margin-left: 25px;
  margin-bottom: 20px;
}

.cuerpo-articulo :deep(li) {
  margin-bottom: 8px;
  line-height: 1.6;
}

.articulo-footer {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 30px;
  text-align: center;
  border-top: 1px solid #eee;
  color: #888;
  font-size: 0.9em;
}
</style>
