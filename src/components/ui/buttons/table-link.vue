<template>
  <router-link class="transition duration-500 ease-in-out bg-white-500 hover:bg-gray-600 transform hover:-translate-y-1 hover:scale-110 rounded-lg border-b-2 border-r-2 border-t border-l px-2 py-1 border-gray-800"
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
