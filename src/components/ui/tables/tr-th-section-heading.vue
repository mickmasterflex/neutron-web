<template>
  <tr class="tr">
    <th :colspan="colspan" class="h5 pt-3 pb-2 text-left">
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
