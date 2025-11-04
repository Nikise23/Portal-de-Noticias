import { createRouter, createWebHistory } from 'vue-router'
import HomePortal from '@/views/HomePortal.vue'
import RegistroView from '@/views/RegistroView.vue'
import InicioSesionView from '@/views/InicioSesionView.vue'
import ArticuloDetalle from '@/views/ArticuloDetalle.vue'
import BusquedaView from '@/views/BusquedaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePortal,
    },
    {
      path: '/articulo/:slug',
      name: 'articulo-detalle',
      component: ArticuloDetalle,
      props: true,
    },
    {
      path: '/busqueda',
      name: 'busqueda',
      component: BusquedaView,
    },
    {
      path: '/registro',
      name: 'registro',
      component: RegistroView,
    },
    {
      path: '/iniciar-sesion',
      name: 'login',
      component: InicioSesionView,
    },
  ],
})

export default router
