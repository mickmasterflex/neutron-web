<template>
  <td class="td w-32">
    <status-indicator :red="status === 'terminated'"
                      :green="status === 'active'"
                      :yellow="status === 'paused'">
      {{ status }}
    </status-indicator>
    <div v-if="activateAt" class="text-sm">Activate at: {{ formattedDate }}</div>
  </td>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    status: {
      type: String,
      validator: (value) => {
        return ['terminated', 'active', 'paused', 'archived'].includes(value)
      },
      required: true
    },
    activateAt: {
      type: String
    }
  },
  computed: {
    formattedDate () {
      let date = new Date(this.activateAt)
      date = date + ' UTC'
      return dayjs(date).format('ddd MMM D, YYYY HH:mm A')
    }
  }
}
</script>
