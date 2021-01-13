<template>
  <span :class="`text-${color}-600 font-${weight} ${capitalize ? 'capitalize' : ''}`">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    red: Boolean,
    yellow: Boolean,
    green: Boolean,
    capitalize: {
      type: Boolean,
      default: true
    },
    weight: {
      type: String,
      default: 'bold',
      validator: function (value) {
        return ['bold', 'light', 'normal'].includes(value)
      }
    }
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
