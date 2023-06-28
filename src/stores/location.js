import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('location', () => {
  const latitude = ref(0)
  const longitude = ref(0)
  const enabled = ref(false)
  
  function setLocation(value) {
    latitude.value = value.latitude
    longitude.value = value.longitude
  }

  function setEnabled(value) {
    enabled.value = value
  }


  return { setLocation, setEnabled, latitude, longitude, enabled }
})
