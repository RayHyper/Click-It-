<script setup>
   
import Box from "../components/Box.vue"

</script>
<template>
 <div>

 </div>
 <div class="hero bg-base-200 min-h-screen p-6">
     
     <div class="flex flex-wrap gap-2">
         
        <!-- <Box v-for="i in 365" :key="i" /> -->
         <Box v-for="i in 25" v-bind:key="i" v-bind:index="i"/>           
     </div>
    
</div>
</template>
