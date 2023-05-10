import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import service from "@/service/index";

export const useItineraryStore = defineStore('itinerary', () => {
  const data = ref({})
  // const doubleCount = computed(() => count.value * 2)
  
  function setItinerary(value) {
    data.value = value
  }

  async function loadItinerary() {
    
    // 
    const { data } = await service({ requiresAuth: false }).get('itineraries?slug=gorg-de-malatosca&populate=image&populate=image_preview&populate=map&populate=audio&populate=answer_image&populate=activities&populate=activities.image&populate=activities.audio&populate=activities.answer_image&populate=activities.answer_audio&populate=activities.options&populate=activities.options.image&populate=activities.options.audio')
    if (data.data && data.data.length)    
    console.log('data', data.data[0])    
    this.data.value = data.data[0]
    console.log('this.data', this.data)
    
    // data.value = value
  }

  return { data, setItinerary, loadItinerary }
})



