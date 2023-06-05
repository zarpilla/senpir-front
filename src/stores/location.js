import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const latitude = ref(0)
  const longitude = ref(0)
  
  function setLocation(value) {
    latitude.value = value.latitude
    longitude.value = value.longitude
  }


  return { setLocation, latitude, longitude }
})
