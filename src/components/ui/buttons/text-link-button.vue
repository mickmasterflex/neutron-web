<template>
  <button
    class="
    text-blue-500
    transition-colors
    duration-150
    rounded
    bg-white
    hover:bg-gray-200
    hover:text-blue-600
    hover:border
    hover:border-gray-300
    border
    py-1
    px-2"
    @click="emitClick($event)"
  ><slot/>
  </button>
</template>

<script>
export default {
  methods: {
    emitClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>
