<template>
  <div :class="`bg-${color}-600 rounded w-auto inline-block text-white overflow-hidden mx-1`">
    <div :class="`px-4 py-2 bg-${color}-500`">{{title}}</div>
    <div class="px-4 py-1 text-4xl font-hairline text-right" style="height: 62px;">{{data}}</div>
  </div>
</template>

<script>
export default {
  props: ['data', 'title', 'color']
}
</script>
