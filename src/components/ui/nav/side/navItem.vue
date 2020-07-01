<template>
  <router-link :to="{name: route}" :class="[active === true ? 'active ' : '' ] + 'app-tab'">
    <font-awesome-icon :icon="icon" class="mr-1"></font-awesome-icon>
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .app-tab {
    @apply text-gray-400 font-light text-lg rounded-l-full px-4 py-3 mb-1 w-full transition duration-200;
  }
  .app-tab:hover {
    @apply bg-gray-900 text-white;
    box-shadow: 0 2px 0 0 #000000;
  }
  .app-tab.active {
    @apply bg-gray-800 text-white;
    box-shadow: 0 3px 0 0 #000000;
  }
</style>
