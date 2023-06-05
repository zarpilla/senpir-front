<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HomeView from './views/HomeView.vue'
import ItineraryView from './views/ItineraryView.vue'
import { useGameStore } from './stores/game'
import { useItineraryStore } from './stores/itinerary'

const itineraryStore = useItineraryStore()
const gameStore = useGameStore()

const router = useRouter();
const route = useRoute()

const routeOk = ref("")

onMounted(async () => {
  await router.isReady();
  if (route.query.route !== itineraryStore.slug) {
    itineraryStore.$reset
    gameStore.$reset
    itineraryStore.setSlug(route.query.route)
    itineraryStore.loadItinerary()
    changeView(HomeView)
    routeOk.value = route.query.route
  }
  
});

// console.log('gameStore.started', itineraryStore.slug)
// console.log('gameStore.started', gameStore.started)

const currentPage = ref(gameStore.started ? ItineraryView : HomeView)

function changeView(page) {
  currentPage.value = page
}

function reset() {
  gameStore.reset()
  currentPage.value = HomeView
}

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="SENPIR v0.1.6" />

      <nav v-if="routeOk">
        <a class="router-link" @click="changeView(ItineraryView)">Itinerari</a>
        <a class="router-link" @click="reset()">Torna a començar</a>
      </nav>
      <nav v-else>Tria una ruta</nav>
    </div>
  </header>
  <component :is="currentPage" />

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  font-size: 12px;
  text-align: center;
  margin-top: 0rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  cursor: pointer;
  color: black;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 0rem;
  }
}
</style>
