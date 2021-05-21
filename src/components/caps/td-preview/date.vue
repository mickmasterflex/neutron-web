<template>
  <div class="flex flex-col flex-grow py-1 px-2">
    <span class="text-gray-700">{{ heading }}</span>
    <span class="font-bold text-gray-900 px-1">
      {{ limit ? limit : '-' }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true
    },
    limit: {
      type: Number
    }
  }
}
</script>
