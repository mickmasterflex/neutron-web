<template>
  <span class="font-bold capitalize"
        :class="`text-${color}-600`">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    red: Boolean,
    yellow: Boolean,
    green: Boolean
  },
  computed: {
    color () {
      if (this.red) {
        return 'red'
      } else if (this.yellow) {
        return 'yellow'
      } else if (this.green) {
        return 'green'
      }
      return 'gray'
    }
  }
}
</script>
