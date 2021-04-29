<template>
  <h1
    :class="loading ? 'animate__animated animate__flash animate__slower' : ''"
    class="h1 text-white">
    {{ loading ? 'Loading...' : content }}
  </h1>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    content: {
      type: String
    }
  }
}
</script>
