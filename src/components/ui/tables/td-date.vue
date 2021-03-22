<template>
  <td class="td">
    <slot name="prefix"/>
      {{formattedDate}}
    <slot name="suffix"/>
  </td>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  computed: {
    formattedDate () {
      if (!this.date) {
        return 'n/a'
      }
      const date = new Date(this.date)
      return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
    }
  }
}
</script>
