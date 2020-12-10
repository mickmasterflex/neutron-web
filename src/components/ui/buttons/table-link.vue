<template>
  <router-link class="hover:bg-gray-600 rounded-lg border-b-3 border-r-3 border-2 px-2 py-1 border-gray-900"
   :to="route"><slot/>
  </router-link>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      required: true
    }
  }
}
</script>
