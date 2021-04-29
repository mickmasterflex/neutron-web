<template>
  <stat-card :data="status" title="Status" :color="statusCardColor" :loading="loading"/>
</template>

<script>
export default {
  props: {
    status: String,
    loading: Boolean
  },
  computed: {
    statusCardColor () {
      if (this.status === 'active') {
        return 'green'
      }
      if (this.status === 'paused') {
        return 'yellow'
      }
      if (this.status === 'terminated') {
        return 'red'
      }
      return 'gray'
    }
  }
}
</script>
