<template>
  <tr class="tr">
    <th :colspan="colspan" class="text-left">
      <heading-5><slot/></heading-5>
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
