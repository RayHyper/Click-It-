<script setup>
import { ref, computed } from 'vue';
import Box from "../components/Box.vue";

const totalBoxes = 1008;
const clickedBoxes = ref(new Set());
const timerStarted = ref(false);
const startTime = ref(null);
const elapsedTime = ref(null);
const scores = ref([]);
const showScoreboard = ref(false);

const allBoxesClicked = computed(() => {
  return clickedBoxes.value.size === totalBoxes;
});

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
}

const bestScore = computed(() => {
  if (scores.value.length === 0) return null;
  return Math.min(...scores.value.map(score => parseFloat(score.time)));
});
</script>

<template>
  <div>
    <div class="hero bg-base-200 min-h-screen p-6">
      <div class="flex flex-col items-center gap-6">
        <!-- Timer Display -->
        <div class="text-2xl font-bold">
          <span v-if="!timerStarted">Click any box to start!</span>
          <span v-else-if="!allBoxesClicked">Go!</span>
          <span v-else>Completed in {{ elapsedTime }} seconds!</span>
        </div>

        <!-- Best Score -->
        <div v-if="bestScore && showScoreboard" class="text-lg text-green-600 font-semibold">
          Best Time: {{ bestScore }} seconds
        </div>

        <!-- Reset Button - Only visible when game is completed -->
        <button 
          v-if="allBoxesClicked"
          @click="resetGame"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Reset Game
        </button>

        <!-- Boxes Grid -->
        <div class="flex flex-wrap gap-2 justify-center">
          <Box 
            v-for="i in totalBoxes" 
            :key="i" 
            :index="i"
            :isClicked="clickedBoxes.has(i)"
            @boxClicked="handleBoxClick"
          />
        </div>

        <!-- Scoreboard (only visible after completion) -->
        <div v-if="showScoreboard && scores.length > 0" 
             class="mt-6 w-full max-w-md transition-opacity duration-300">
          <h2 class="text-xl font-bold mb-3">Previous Scores</h2>
          <div class="bg-white rounded-lg shadow-md p-4">
            <div class="max-h-48 overflow-y-auto">
              <table class="w-full">
                <thead>
                  <tr>
                    <th class="text-left pb-2">Time</th>
                    <th class="text-left pb-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(score, index) in scores.slice().reverse()" :key="index"
                      class="border-t">
                    <td class="py-2">{{ score.date }}</td>
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