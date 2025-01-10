<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Click It!</h1>
        <p class="py-6">How many boxes can you click before time runs out?</p>
      
          <div class="flex justify-center gap-2">
            <div>
                <RouterLink to="/lvl1">
                <button class="btn btn-info text-white">Level 1</button>
            </RouterLink>
            </div>
            <div>
                <RouterLink to="/lvl2">
                    <button class="btn btn-info text-white">Level 2</button>
                </RouterLink>
                
            </div>
            <div>
                <RouterLink to="/lvl3">
                    <button class="btn btn-info text-white">Level 3</button>
                </RouterLink>
                
            </div>
            <div>
                <RouterLink to="/lvl4">
                    <button class="btn btn-info text-white">Canvas</button>
                </RouterLink>
                
            </div>
          </div>
    
      </div>
    </div>
  </div>
</template>

