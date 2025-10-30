<template>
  <div class="barra-superior">
    <div class="barra-temas">
      <span>Noticias hoy</span>
      <span class="separador">|</span>
      <a href="#">Dólar hoy</a>
      <a href="#">Javier Milei</a>
      <a href="#">Elecciones 2025</a>
      <a href="#">Crisis en Perú</a>
    </div>

    <div class="barra-fecha">
      {{ fechaHoraActual }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const fechaHoraActual = ref('')
let intervalo

const actualizarFecha = () => {
  const opciones = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires',
    hour12: false,
  }

  fechaHoraActual.value = new Intl.DateTimeFormat('es-AR', opciones).format(new Date())
}

onMounted(() => {
  actualizarFecha()
  intervalo = setInterval(actualizarFecha, 60000)
})

onUnmounted(() => {
  clearInterval(intervalo)
})
</script>

<style scoped>
.barra-superior {
  border-bottom: 1px solid #eee;
  font-size: 0.85em;
  padding: 8px 0;

  max-width: 1400px;
  margin: 0 auto;
  padding-left: 30px;
  padding-right: 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.barra-temas a {
  margin-left: 10px;
  color: #333;
  text-decoration: none;
}

.barra-temas a:hover {
  text-decoration: none;
}

.barra-temas span {
  font-weight: bold;
  margin-right: 10px;
}

.barra-temas .separador {
  color: #ccc;
  font-weight: normal;
  margin-right: 0;
}

.barra-fecha {
  color: #555;
  text-transform: capitalize;
}
</style>
