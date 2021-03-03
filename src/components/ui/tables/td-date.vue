<template>
  <td class="td">
    <span class="">
      <slot name="prefix"/>
      {{formattedDate}}
      <slot name="suffix"/>
    </span>
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
