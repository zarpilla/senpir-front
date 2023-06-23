import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItineraryView from '../views/ItineraryView.vue'
import ItineraryPointView from '../views/ItineraryPointView.vue'


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
      component: HomeView
    },
    {
      path: '/:slug/inici',
      name: 'itinerary',
      component: ItineraryView
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
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
