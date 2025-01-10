<template>
    <div
      @click="handleClick"
      :class="{ 'bg-green-400': isClicked, 'bg-cyan-950': !isClicked }"
      class="hover:opacity-90 w-20 h-20 rounded-md shadow-sm"
    >

    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    index: Number,
    isClicked: Boolean
  });
  
  const emit = defineEmits(['boxClicked']);
  
  function handleClick(event) {
    event.preventDefault();
    emit('boxClicked', props.index);
  }
  </script>