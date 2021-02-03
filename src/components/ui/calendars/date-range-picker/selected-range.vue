<template>
  <span class="font-bold text-gray-800">
    {{ startDate }} <font-awesome-icon icon="arrow-right" class="text-gray-400"></font-awesome-icon> {{ endDate }}
  </span>
</template>

<script>
export default {
  props: {
    startDate: {
      required: true,
      type: String
    },
    endDate: {
      required: true,
      type: String
    }
  }
}
</script>
