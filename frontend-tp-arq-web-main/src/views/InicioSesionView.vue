<template>
  <div class="auth-page-container">
    <img
      class="background-image"
      src="https://cdn-proxymedia-digicert.tv-fr-cdn.orange.net/api/v1/images/2329%2F14794a8b553b48fdaf0cad11278c591a.jpg?service=guidetv&device=W_PC"
      alt="Fondo"
    />
    <div class="auth-box">
      <router-link to="/" class="btn-cerrar-form" title="Volver a la página principal">
        <i class="bi bi-x-lg"></i>
      </router-link>

      <img src="/logo.svg" alt="PortalDev News Logo" class="auth-logo" />

      <h3 class="auth-title">Iniciar Sesión</h3>

      <div class="social-login">
        <p class="social-text">Con redes sociales</p>
        <button class="social-btn google-btn">
          <i class="bi bi-google"></i> Iniciar sesión con Google
        </button>
        <button class="social-btn facebook-btn">
          <i class="bi bi-facebook"></i> Iniciar sesión con Facebook
        </button>
        <button class="social-btn apple-btn">
          <i class="bi bi-apple"></i> Iniciar sesión con Apple
        </button>
      </div>

      <div class="separator"><span>ó</span></div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email*</label>
          <input type="email" id="email" v-model="login.email" required />
        </div>

        <div class="form-group">
          <label for="password">Contraseña*</label>
          <div class="password-input-wrapper">
            <input :type="passwordFieldType" id="password" v-model="login.password" required />

            <button type="button" class="btn-toggle-password" @click="togglePasswordVisibility">
              <i
                :class="
                  passwordFieldType === 'password' ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'
                "
              ></i>
            </button>
          </div>
        </div>

        <div class="forgot-password">
          <a href="#">¿Olvidaste la contraseña?</a>
        </div>

        <button type="submit" class="btn-primary">Iniciar Sesión</button>
      </form>

      <p class="auth-footer-link">
        Si no tenés una cuenta, podés crear una <router-link to="/registro">ACÁ</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const login = ref({
  email: '',
  password: '',
})

const isPasswordVisible = ref(false)

const passwordFieldType = computed(() => {
  return isPasswordVisible.value ? 'text' : 'password'
})

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const handleLogin = () => {
  console.log('Intentando registrar:', login.value)
  alert('Iniciando sesión...')
}
</script>

<style scoped>
.auth-page-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.auth-page-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  pointer-events: none;
  z-index: 1;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  z-index: 0;
}

.btn-cerrar-form {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  text-decoration: none;
  color: #555;
  cursor: pointer;
  padding: 0;
  font-size: 1.5em;
  line-height: 1;
  transition: color 0.2s;
  z-index: 10;
}

.btn-cerrar-form:hover {
  color: #000;
}

.auth-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  width: 100%;
  max-width: 400px;
  text-align: center;
  z-index: 2;
}

.auth-logo {
  width: 300px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}

.auth-title {
  font-size: 1.6em;
  font-weight: 500;
  margin-bottom: 25px;
}

.social-login {
  margin-bottom: 25px;
}

.social-text {
  font-size: 0.9em;
  color: #333;
  margin-bottom: 10px;
}

.social-btn {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s;
}

.social-btn i {
  margin-right: 10px;
  font-size: 1.2em;
}

.social-btn:hover {
  background-color: #f0f0f0;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: #a1a1a1;
  margin: 20px 0;
}
.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d3d3d3;
}
.separator:not(:empty)::before {
  margin-right: 0.25em;
}
.separator:not(:empty)::after {
  margin-left: 0.25em;
}

.auth-form {
  text-align: left;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 0.9em;
  color: #333;
  margin-bottom: 5px;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.form-group input {
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box;
}

.btn-toggle-password {
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);

  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #777;
  line-height: 1;
  transition: color 0.2s;
}

.btn-toggle-password:hover {
  color: #333;
}

.btn-toggle-password i {
  font-size: 1.5em;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.auth-footer-link {
  margin-top: 20px;
  font-size: 0.9em;
}

.auth-footer-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.forgot-password {
  text-align: right;
  margin-top: -10px;
  margin-bottom: 15px;
}
.forgot-password a {
  font-size: 0.85em;
  color: #007bff;
  text-decoration: none;
}
</style>
