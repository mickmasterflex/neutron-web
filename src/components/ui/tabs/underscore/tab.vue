<template>
  <li class="cursor-pointer font-normal text-gray-800 border-b-4 border-transparent transition-colors duration-300"
      :class="tabClasses"
  >
    <slot/>
  </li>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'lg',
      validator: (value) => {
        return ['sm', 'lg'].includes(value)
      }
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tabClasses () {
      let classes = ''
      if (this.active) {
        classes = classes + 'text-gray-900 font-bold border-red-500 '
      } else {
        classes = classes + 'hover:text-gray-900 hover:border-gray-300 '
      }
      if (this.size === 'sm') {
        classes = classes + 'tab-sm--slot'
      } else {
        classes = classes + 'tab-lg--slot'
      }
      return classes
    }
  }
}
</script>

<style scoped>
  .tab-sm--slot > * {
    @apply block pt-2 pb-1 px-2 text-base
  }
  .tab-lg--slot > * {
    @apply block pt-6 pb-4 px-4 text-lg
  }
</style>
