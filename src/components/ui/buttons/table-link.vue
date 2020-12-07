<template>
  <router-link class="rounded-lg border-gray-900"
   :to="route"><slot/>
  </router-link>
</template>

<script>
export default {
  props: {
    route: Object
  }
}
</script>
