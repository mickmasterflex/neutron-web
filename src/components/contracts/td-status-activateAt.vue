<template>
  <td class="td w-32">
    <status-indicator :red="status === 'terminated'"
                      :green="status === 'active'"
                      :yellow="status === 'paused'">
      {{ status }}
    </status-indicator>
    <div v-if="activateAt" class="text-sm">activating at {{ new Date(activateAt).toLocaleString() }}</div>
  </td>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      validator: (value) => {
        return ['terminated', 'active', 'paused', 'terminated'].includes(value)
      },
      required: true
    },
    activateAt: {
      type: String
    }
  }
}
</script>
