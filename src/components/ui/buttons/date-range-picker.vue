<template>
  <span class="flex flex-row items-center bg-gray-200 rounded-full p-1">
    <button class="btn-blue btn btn-circle btn-md">
      <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
    </button>
    <span class="font-bold px-2">
      {{ dateRangeText }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    dateRangeText: String
  }
}
</script>
