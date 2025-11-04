<template>
  <div class="comentarios-section">
    <h2>Comentarios ({{ totalComentarios }})</h2>

    <div class="comentario-form-wrapper">
      <div class="comentario-input-container">
        <div class="avatar-placeholder">
          {{ getInitials(newCommentAuthor || 'Anónimo') }}
        </div>

        <form @submit.prevent="submitComment" class="comment-form">
          <textarea
            v-model="newCommentContent"
            placeholder="Sumá tu opinión y dejá tu comentario por favor"
            rows="1"
            required
            @focus="isFormExpanded = true"
            @click="isFormExpanded = true"
            @input="autoResize"
            ref="commentTextarea"
          ></textarea>

          <div v-if="isFormExpanded" class="expanded-fields">
            <div class="anon-fields">
              <input
                v-model="newCommentAuthor"
                placeholder="Tu Nombre (Obligatorio)"
                type="text"
                required
              />
              <input
                v-model="newCommentEmail"
                placeholder="Tu Email (Obligatorio)"
                type="email"
                required
              />
            </div>

            <div class="form-actions">
              <button type="button" class="btn-cancelar" @click="resetForm">CANCELAR</button>
              <button
                type="submit"
                :disabled="isSubmitting || !newCommentContent.trim()"
                class="btn-publicar"
              >
                {{ isSubmitting ? 'PUBLICANDO...' : 'PUBLICAR' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div v-if="loading" class="comentarios-loading">Cargando comentarios...</div>
    <div v-else-if="error" class="comentarios-error">
      Error al cargar comentarios: {{ error.value?.message || 'Verifica la consola.' }}
    </div>
    <div v-else-if="comentarios.length === 0" class="no-comentarios">
      Sé el primero en comentar.
    </div>

    <div v-else class="comentarios-list">
      <div v-for="comment in comentarios" :key="comment._id" class="comentario-item">
        <div class="comentario-header">
          <span class="comentario-author">
            <div class="avatar">
              {{ getInitials(comment.author || 'Anónimo') }}
            </div>
            <strong>{{ comment.author || 'Anónimo' }}</strong>
          </span>
          <span class="comentario-date">
            {{ new Date(comment.createdAt).toLocaleDateString() }}
          </span>
        </div>
        <p class="comentario-content">{{ comment.content }}</p>

        <div class="comentario-actions">
          <button @click="toggleLike(comment._id, comment.likedByMe)">
            <i class="bi bi-heart-fill"></i> {{ comment.likesCount || 0 }} Me gusta
          </button>
        </div>
      </div>

      <div v-if="pagination.totalPages > 1" class="comentarios-pagination">
        <button @click="goToPage(pagination.currentPage - 1)" :disabled="!pagination.hasPrevPage">
          Anterior
        </button>
        <span>Página {{ pagination.currentPage }} de {{ pagination.totalPages }}</span>
        <button @click="goToPage(pagination.currentPage + 1)" :disabled="!pagination.hasNextPage">
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'

const props = defineProps({
  articleSlug: {
    type: String,
    required: true,
  },
})

const comentarios = ref([])
const totalComentarios = ref(0)
const loading = ref(false)
const error = ref(null)
const pagination = ref({})
const currentPage = ref(1)
const commentsPerPage = 20

const isFormExpanded = ref(false)
const newCommentContent = ref('')
const newCommentAuthor = ref('')
const newCommentEmail = ref('')
const isSubmitting = ref(false)
const commentTextarea = ref(null)

const fetchComments = async (slug, page) => {
  loading.value = true
  error.value = null

  try {
    const response = await fetch(
      (import.meta.env.VITE_API_BASE || '') + `/api/articles/${slug}/comments?page=${page}&limit=${commentsPerPage}`,
    )

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const jsonResponse = await response.json()

    if (!jsonResponse.success) {
      throw new Error(jsonResponse.message || 'Fallo en la respuesta de la API.')
    }

    comentarios.value = jsonResponse.data.comments || []
    pagination.value = jsonResponse.data.pagination || {}
    totalComentarios.value = jsonResponse.data.pagination?.totalComments || 0
    currentPage.value = jsonResponse.data.pagination?.currentPage || 1
  } catch (err) {
    console.error('Error al cargar comentarios:', err)
    error.value = err
  } finally {
    loading.value = false
  }
}

const submitComment = async () => {
  if (
    !newCommentContent.value.trim() ||
    !newCommentAuthor.value.trim() ||
    !newCommentEmail.value.trim()
  ) {
    alert('Por favor, completa el comentario, tu nombre y tu email.')
    return
  }

  isSubmitting.value = true
  error.value = null

  const commentData = {
    content: newCommentContent.value,
    author: newCommentAuthor.value,
    email: newCommentEmail.value,
  }

  try {
  const response = await fetch((import.meta.env.VITE_API_BASE || '') + `/api/articles/${props.articleSlug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    })

    const jsonResponse = await response.json()

    if (!response.ok || !jsonResponse.success) {
      const msg = jsonResponse.message || `Error ${response.status} al enviar comentario.`
      throw new Error(msg)
    }

    resetForm()
    fetchComments(props.articleSlug, 1)

    alert('Comentario enviado. Si no aparece inmediatamente, podría estar esperando moderación.')
  } catch (err) {
    console.error('Error al enviar comentario:', err)
    error.value = err
    alert(`Fallo al enviar: ${err.message}`)
  } finally {
    isSubmitting.value = false
  }
}

const toggleLike = async (commentId, isLiked) => {
  const action = isLiked ? 'decrement' : 'increment'

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE || ''}/api/comments/${commentId}/like`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: action }),
      }
    )

    const jsonResponse = await response.json()

    if (!response.ok) {
      throw new Error(jsonResponse.message || 'Fallo al alternar like.')
    }

    if (!jsonResponse.success) {
      throw new Error(jsonResponse.message || 'Error al dar like')
    }

    // Recargar comentarios para actualizar los contadores
    fetchComments(props.articleSlug, currentPage.value)
  } catch (e) {
    console.error('Error al alternar like:', e)
    alert(`Error al dar like: ${e.message}`)
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    currentPage.value = page
    fetchComments(props.articleSlug, page)
  }
}

const getInitials = (name) => {
  const parts = name.trim().split(/\s+/)
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return (parts[0][0] || 'J').toUpperCase()
}

const resetForm = () => {
  newCommentContent.value = ''
  isFormExpanded.value = false
  isSubmitting.value = false
}

function autoResize() {
  const el = commentTextarea.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}

onMounted(() => {
  autoResize()
})

watch(
  () => props.articleSlug,
  (newSlug) => {
    if (newSlug) {
      fetchComments(newSlug, 1)
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.comentarios-section {
  max-width: 700px;
  margin: 50px auto;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.comentarios-section h2 {
  font-size: 1.8em;
  margin-bottom: 25px;
  color: #1a1a1a;
}

.comentario-form-wrapper {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.comentario-input-container {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.1em;
  flex-shrink: 0;
  background-image: linear-gradient(90deg, #32d0f3 0%, #3a47d5 100%);
}

.comment-form {
  flex-grow: 1;
}

.comment-form textarea {
  width: 100%;
  min-height: 40px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1em;
  resize: vertical;
  transition: border-bottom 0.3s;
  outline: none;
  overflow: hidden;
}

.comment-form textarea:focus {
  border-bottom: 1px solid #006dff;
}

.expanded-fields {
  margin-top: 10px;
}

.anon-fields {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.anon-fields input {
  flex-grow: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9em;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.form-actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 500;
  text-transform: uppercase;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.btn-cancelar {
  background: none;
  color: #666;
}

.btn-cancelar:hover {
  color: #333;
  background-color: #f0f0f0;
}

.btn-publicar {
  background-color: #006dff;
  color: white;
  font-weight: bold;
}

.btn-publicar:hover:not(:disabled) {
  background-color: #0056cc;
}

.btn-publicar:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.comentario-item {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: white;
}

.comentario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.comentario-author {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #1a1a1a;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 0.9em;
  margin-right: 10px;
  flex-shrink: 0;
  background-image: linear-gradient(90deg, #32d0f3 0%, #3a47d5 100%);
}

.comentario-date {
  font-size: 0.8em;
  color: #999;
}

.comentario-content {
  margin-top: 0;
  margin-bottom: 15px;
  line-height: 1.6;
}

.comentario-actions button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 5px;
}

.comentario-actions i {
  color: #ff4d4d;
}

.comentarios-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}

.comentarios-pagination button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.comentarios-pagination button:disabled {
  background-color: #eee;
  color: #ccc;
  cursor: not-allowed;
}
</style>
