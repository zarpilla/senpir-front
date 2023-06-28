import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import ItineraryPointView from '../views/ItineraryPointView.vue'
import FirstView from '../views/FirstView.vue'
import GaleriaView from '../views/GaleriaView.vue'
import RoutesView from '../views/RoutesView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:slug',
      name: 'home-slug',
      component: FirstView
    },
    {
      path: '/:slug/inici',
      name: 'itinerary',
      component: ItineraryView,
      props: { start: true }
    },
    {
      path: '/:slug/view',
      name: 'itinerary-view',
      component: FirstView,
      props: { view: true }
    },
    {
      path: '/:slug/mid',
      name: 'itinerary-mid',
      component: ItineraryView,
      props: { mid: true }
    },
    {
      path: '/:slug/final',
      name: 'itinerary-final',
      component: ItineraryView,
      props: { end: true }
    },
    {
      path: '/:slug/p/:num',
      name: 'point',
      component: ItineraryPointView
    },
    {
      path: '/:slug/galeria',
      name: 'galeria',
      component: GaleriaView
    },
    {
      path: '/:slug/routes',
      name: 'view-all-routes',
      component: RoutesView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
