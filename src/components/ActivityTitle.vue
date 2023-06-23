<script setup>

const props = defineProps({
  activity: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  last: {
    type: Boolean,
    required: false
  }
})

</script>

<template>
  <div class="activity-title text-center">
    <div v-if="!last" class="circle" :class="`bg-color-${index}`">{{index+1}}</div>    
    <h1 class="pt-2 pb-2">{{ activity.name }}</h1>
  </div>
</template>

<style scoped>
.circle{
  height: 50px;
  width: 50px;
  border-radius: 50px;

  font-size: 30px;
font-weight: 600;
line-height: 50px; 
color: #003842;
margin: 30px auto 10px;
}
h1{

  font-size: 30px;
font-weight: 600;
line-height: 20px; 
color: #003842;
}
</style>
