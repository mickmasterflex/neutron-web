<template>
  <div>
    <ul class="flex flex-row mb-3">
      <li class="active"><router-link class="text-link" :to="{name: 'Products'}">Product Mgmt</router-link></li>
      <li class="px-3"> | </li>
      <li><router-link class="text-link" :to="{name: 'FieldManagement'}">Field Mgmt</router-link></li>
    </ul>
    <div class="hud">
      <h1 class="h1 text-white">Product Management</h1>
    </div>
  </div>
</template>
