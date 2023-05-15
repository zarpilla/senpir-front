<script setup>
import { useRouter, useRoute } from 'vue-router'
import { watch } from 'vue'
import { useItineraryStore } from '../stores/itinerary'

const itineraryStore = useItineraryStore()
const route = useRoute()

const slug = route.query.route
console.log('slug', slug)
console.log('route.params2', route)

watch(
      () => route.query.route,
      async newSlug => {
        console.log('newSlug', newSlug)
        // userData.value = await fetchUser(newId)
        itineraryStore.setSlug(newSlug)
      }
    )

defineProps({
  msg: {
    type: String,
    required: true
  }

  // $route.params.id
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>    
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
