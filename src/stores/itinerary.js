import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import service from "@/service/index";
import localforage from 'localforage'

export const useItineraryStore = defineStore('itinerary', () => {
  const data = ref({})
  const slug = ref("")

  function setItinerary(value) {
    data.value = value
  }

  function setSlug(value) {
    slug.value = value
  }

  async function loadItinerary() {

    const itinerary = slug.value
    const key = `itinerary.${itinerary}`
    try {
      console.log('from api', navigator.onLine)
      if (navigator.onLine) {
        const query = `itineraries?filters[slug][$eq]=${itinerary}&populate=image&populate=image_preview&populate=map&populate=audio&populate=answer_image&populate=activities&populate=activities.image&populate=activities.audio&populate=activities.answer_image&populate=activities.answer_audio&populate=activities.options&populate=activities.options.image&populate=activities.options.audio`
        const { data } = await service({ requiresAuth: false }).get(query)

        if (data.data && data.data.length) {
          this.data.value = data.data[0]
        }

        localforage.setItem(key, JSON.stringify(this.data.value))

      } else {
        localforage.getItem(key).then(async (value) => {
          console.log('from idb')

          if (value) {
            this.data.value = JSON.parse(value)
          }

        }).catch(async (err) => {
          console.log("err");
          console.log(err);
        });
      }
    }
    catch (err) {
      console.error('err', err)
    }



  }

  return { data, slug, setSlug, setItinerary, loadItinerary }
})



