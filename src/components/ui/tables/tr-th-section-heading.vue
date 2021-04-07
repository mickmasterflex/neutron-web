<template>
  <tr class="tr">
    <th :colspan="colspan"
        class="h4 px-3 py-3 bg-gray-200 border-r-2 border-l-2 text-left">
      <slot></slot>
    </th>
  </tr>
</template>

<script>
export default {
  props: {
    colspan: {
      default: 1,
      type: Number
    }
  }
}
</script>
