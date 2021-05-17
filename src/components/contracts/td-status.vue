<template>
  <td class="td w-32">
    <status-indicator :red="status === 'terminated'"
                      :green="status === 'active'"
                      :yellow="status === 'paused'">
      {{ status }}
    </status-indicator>
  </td>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      validator: (value) => {
        return ['terminated', 'active', 'paused', 'archived'].includes(value)
      },
      required: true
    }
  }
}
</script>
