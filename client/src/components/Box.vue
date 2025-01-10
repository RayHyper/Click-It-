<template>
    <div
      @click="toggleClick"
      :class="{ 'bg-green-500': isClicked, 'bg-cyan-950': !isClicked }"
      class="hover:opacity-90 w-10 h-10 rounded-md shadow-sm"
    >

    <!--     <p class="text-white">{{ index }}</p>      -->
    
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, onMounted } from 'vue';
 
  const props = defineProps({
    index: Number,
  });
  const isClicked = ref(false);
  
  function toggleClick(event) {
    event.preventDefault();
    isClicked.value = true;
   
  }


  
  </script>
  