<template>
  <div class="portal-header-wrapper">
    <BarraSuperior />

    <header class="portal-header-principal">
      <div class="header-inner">
        <router-link to="/" class="logo-link">
          <img src="/logo.svg" alt="Portal Logo" class="logo-img" />
        </router-link>

        <div class="header-acciones">
          <router-link to="/registro" class="btn-suscripcion">Registrate GRATIS</router-link>
          <router-link to="/iniciar-sesion" class="btn-ingreso">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
            Ingresar
          </router-link>
        </div>
      </div>
    </header>

    <nav class="portal-nav-menu">
      <div class="menu-inner">
        <SearchBar />
        <router-link to="/">ÚLTIMO MOMENTO</router-link>
        <a href="#">POLÍTICA</a>
        <a href="#">ECONOMÍA</a>
        <a href="#">RURAL</a>
        <a href="#">SOCIEDAD</a>
        <a href="#">MUNDO</a>
        <a href="#">DEPORTES</a>
        <a href="#">ESPECTÁCULOS</a>
      </div>
    </nav>
  </div>
</template>

<script setup>
import BarraSuperior from '@/components/BarraSuperior.vue'
import SearchBar from './SearchBar.vue'
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

.logo-img {
  width: auto;
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
  text-decoration: none;
  transition: background-color 0.2s;
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
  text-decoration: none;
  transition: border-color 0.2s;
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
  transition: color 0.2s;
}
</style>
