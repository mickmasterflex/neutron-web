<template>
  <div id="app" class="h-screen flex flex-row p-5">
    <div id="nav" class="w-1/12 h-screen flex flex-col items-center justify-center">
      <router-link to="/" class="btn btn-red">Home</router-link>
      <router-link to="/about" class="btn btn-proooooooton">About</router-link>
    </div>
    <div class="w-11/12 rounded-lg bg-gray-100">
      <router-view/>
    </div>
  </div>
</template>
