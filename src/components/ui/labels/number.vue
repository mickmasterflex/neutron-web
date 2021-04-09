<template>
  <base-label>
    {{formattedNumber}}
  </base-label>
</template>

<script>
export default {
  props: {
    number: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    formattedNumber () {
      if (!this.number) {
        return 0
      }
      return Number(this.number).toLocaleString()
    }
  }
}
</script>
