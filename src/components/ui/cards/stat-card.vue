<template>
  <div :class="`bg-${color}-600 rounded w-auto inline-block text-white overflow-hidden mx-1`">
    <div :class="`px-4 py-2 bg-${color}-500`">{{title}}</div>
    <div class="px-4 py-1 text-4xl font-hairline text-right" style="height: 62px;">{{renderedData}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [String, Number]
    },
    commaSeparated: {
      type: Boolean,
      default: false
    },
    dollarAmount: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'turquoise',
      validator: (value) => {
        return [
          'blue',
          'gray',
          'green',
          'indigo',
          'orange',
          'red',
          'turquoise',
          'yellow'
        ].includes(value)
      }
    }
  },
  computed: {
    renderedData () {
      let rendered = this.data
      if (this.commaSeparated) {
        rendered = Number(rendered).toLocaleString()
      }
      if (this.dollarAmount) {
        rendered = '$' + rendered
      }
      return rendered
    }
  }
}
</script>
