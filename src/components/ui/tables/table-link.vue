<template>
  <span @click="$emit('table-link-click')"
        class="transition duration-200 ease-in-out bg-white-500 hover:bg-gray-700 hover:text-white rounded-md border-b-2 border-r-2 border-t border-l px-2 py-1 border-gray-800 cursor-pointer">
    {{ formattedNumber }} <font-awesome-icon icon="angle-right" class="text-gray-500"></font-awesome-icon>
  </span>
</template>

<script>
export default {
  props: {
    number: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    formattedNumber () {
      if (!this.number) {
        return 0
      }
      return Number(this.number).toLocaleString()
    }
  }
}
</script>
