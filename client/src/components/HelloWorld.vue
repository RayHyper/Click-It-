<template>
<div class="navbar bg-base-100 fixed w-full z-50 top-0">
  <div class="flex-1 ">
    <RouterLink to="/">
      <a class="btn btn-ghost text-xl">Click It!</a>
    </RouterLink>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><button @click="resetGames">Reset All</button></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul class="bg-base-100 rounded-t-none p-2">
            <li><a>Link 1</a></li>
            <li><a>Link 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>

  
</div>


</template>

<script setup>

function resetGames(){
    localStorage.clear()
    location.reload()
}


</script>


