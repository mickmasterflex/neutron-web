export default {
  props: {
    value: {
      type: null,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    mode: {
      type: String,
      default: 'aggressive'
    }
  },
  data: () => ({
    inner_value: ''
  }),
  watch: {
    // Handles internal model changes.
    inner_value (newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value (newVal) {
      this.inner_value = newVal
    }
  },
  created () {
    if (this.value) {
      this.inner_value = this.value
    }
  }
}
