<template>
  <tr class="tr">
    <td :colspan="colspan"
        class="font-bold px-3 py-3 bg-gray-300">
      <slot></slot>
    </td>
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
