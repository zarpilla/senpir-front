<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

import HomeView from './views/HomeView.vue'
import ItineraryView from './views/ItineraryView.vue'


const currentPage = ref(HomeView)

function changeView(page) {
  currentPage.value = page
}

</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="SENPIR v0.1.5" />

      <nav>
        <a class="router-link" @click="changeView(HomeView)">Inici</a>
        <a class="router-link" @click="changeView(ItineraryView)">Itinerari</a>
      </nav>
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
