<script setup>
import { ref, computed, onMounted } from 'vue';
import Box from "../components/Box.vue";

const BOX_SIZE = 40; // Size of box in pixels
const totalBoxes = ref(10);
const clickedBoxes = ref(new Set());
const timerStarted = ref(false);
const startTime = ref(null);
const elapsedTime = ref(null);
const scores = ref([]);
const showScoreboard = ref(false);
const boxes = ref([]);

const allBoxesClicked = computed(() => {
  return clickedBoxes.value.size === totalBoxes.value;
});

function checkCollision(newBox, existingBoxes) {
  const buffer = BOX_SIZE + 10; // Add some padding between boxes
  for (const box of existingBoxes) {
    const dx = Math.abs(newBox.left - box.left);
    const dy = Math.abs(newBox.top - box.top);
    if (dx < buffer && dy < buffer) {
      return true; // Collision detected
    }
  }
  return false;
}

function generateBoxes() {
  boxes.value = [];
  const containerWidth = window.innerWidth * 0.8; // 80% of window width
  const containerHeight = window.innerHeight * 0.6; // 60% of window height
  
  for (let i = 1; i <= totalBoxes.value; i++) {
    let newBox;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      newBox = {
        id: i,
        left: Math.floor((Math.random() * (containerWidth - BOX_SIZE * 2)) + BOX_SIZE),
        top: Math.floor((Math.random() * (containerHeight - BOX_SIZE * 2)) + BOX_SIZE)
      };
      attempts++;
    } while (checkCollision(newBox, boxes.value) && attempts < maxAttempts);

    if (attempts < maxAttempts) {
      boxes.value.push(newBox);
    }
  }
}

function handleBoxClick(index) {
  if (!timerStarted.value) {
    timerStarted.value = true;
    startTime.value = Date.now();
    showScoreboard.value = false;
  }

  clickedBoxes.value.add(index);

  if (allBoxesClicked.value) {
    const endTime = Date.now();
    elapsedTime.value = ((endTime - startTime.value) / 1000).toFixed(2);
    scores.value.push({
      time: elapsedTime.value,
      boxes: totalBoxes.value,
      date: new Date().toLocaleTimeString()
    });
    showScoreboard.value = true;
  }
}

function resetGame() {
  clickedBoxes.value.clear();
  timerStarted.value = false;
  startTime.value = null;
  elapsedTime.value = null;
  showScoreboard.value = false;
  totalBoxes.value = 10;
  generateBoxes();
}

const bestScore = computed(() => {
  if (scores.value.length === 0) return null;
  return Math.min(...scores.value.map(score => parseFloat(score.time)));
});

onMounted(() => {
  generateBoxes();
  
  // Handle window resize
  window.addEventListener('resize', generateBoxes);
});
</script>

<template>
  <div>
    <div class="hero bg-base-200 min-h-screen p-6">
      <div class="flex flex-col items-center gap-6 w-full">
        <!-- Timer Display -->
        <div class="text-2xl font-bold">
          <span v-if="!timerStarted">Click any box to start! ({{ totalBoxes }} boxes)</span>
          <span v-else-if="!allBoxesClicked">Timer running... ({{ clickedBoxes.size }}/{{ totalBoxes }} clicked)</span>
          <span v-else>Completed in {{ elapsedTime }} seconds!</span>
        </div>

        <!-- Best Score -->
        <div v-if="bestScore && showScoreboard" class="text-lg text-green-600 font-semibold">
          Best Time: {{ bestScore }} seconds
        </div>

        <!-- Reset Button -->
        <button 
          v-if="allBoxesClicked"
          @click="resetGame"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Reset Game
        </button>

        <!-- Boxes Container -->
        <div class="relative w-full h-[60vh] bg-gray-100 rounded-lg">
          <Box 
            v-for="box in boxes" 
            :key="box.id" 
            :index="box.id"
            :isClicked="clickedBoxes.has(box.id)"
            @boxClicked="handleBoxClick"
            class="absolute transition-all duration-300"
            :style="{
              left: box.left + 'px',
              top: box.top + 'px',
            }"
          />
        </div>

        <!-- Scoreboard -->
        <div v-if="showScoreboard && scores.length > 0" 
             class="mt-6 w-full max-w-md transition-opacity duration-300">
          <h2 class="text-xl font-bold mb-3">Previous Scores</h2>
          <div class="bg-white rounded-lg shadow-md p-4">
            <div class="max-h-48 overflow-y-auto">
              <table class="w-full">
                <thead>
                  <tr>
                    <th class="text-left pb-2">Time</th>
                    <th class="text-left pb-2">Boxes</th>
                    <th class="text-left pb-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(score, index) in scores.slice().reverse()" :key="index"
                      class="border-t">
                    <td class="py-2">{{ score.date }}</td>
                    <td class="py-2">{{ score.boxes }}</td>
                    <td class="py-2">{{ score.time }}s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>