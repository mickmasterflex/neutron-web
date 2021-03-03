<template>
  <td class="td">{{formattedNumber}}</td>
</template>

<script>
export default {
  props: {
    number: {
      type: [String, Number],
      default: 0
    },
    dollar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    formattedNumber () {
      if (!this.number) {
        return 0
      }
      let number = Number(this.number).toLocaleString()
      if (this.dollar) {
        number = '$' + number
      }
      return number
    }
  }
}
</script>
