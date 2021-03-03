<template>
  <span class="rounded bg-gray-300 p-2 py-1 text-sm font-bold">
    {{formattedNumber}}
  </span>
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
