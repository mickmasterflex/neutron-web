<template>
  <li :class="[active === true ? 'active ' : ''] + `top-nav-item bg-gray-800 text-gray-400 transition-colors duration-200 font-bold uppercase tracking-wide`">
    <router-link :to="{name: route}" class="px-6 py-3 block">
      {{ label }}
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    route: {
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

<style>
  .top-nav-item.active {
    @apply bg-white text-black-100;
  }
  .top-nav-item:hover:not(.active) {
    @apply text-gray-300;
  }
  .top-nav-item + .top-nav-item {
    margin-left: .125rem
  }
  .top-nav-item:first-child {
    @apply rounded-tl-xl;
  }
  .top-nav-item:last-child {
    @apply rounded-tr-xl;
  }
</style>
