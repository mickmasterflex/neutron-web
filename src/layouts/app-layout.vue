<template>
  <div class="min-h-screen flex flex-row p-5">
    <div id="nav" class="w-1/12 min-h-screen flex flex-col items-center justify-center">
      <!--<div class="pr-5 mb-5"><img alt="Proton Logo" class="w-full h-auto" src="../public/images/logo.png"></div>-->
      <router-link :to="{name: 'Dashboard'}" class="app-tab">Dashboard</router-link>
      <router-link :to="{name: 'Analytics'}" class="app-tab">Analytics</router-link>
      <router-link :to="{name: 'Relationships'}" class="app-tab">Relationships</router-link>
      <router-link :to="{name: 'Brands'}" class="app-tab">Products</router-link>
      <router-link :to="{name: 'Config'}" class="app-tab">Config</router-link>
      <router-link :to="{name: 'Utilities'}" class="app-tab">Utilities</router-link>
      <router-link :to="{name: 'Users'}" class="app-tab">Users</router-link>

      <logout-button></logout-button>
    </div>
    <div class="w-11/12 rounded-lg bg-white p-5">
      <slot/>
    </div>
  </div>
</template>

<script>
import logoutButton from '@/components/authentication/logout'

export default {
  components: {
    'logout-button': logoutButton
  }
}
</script>
