<template>
  <tr class="tr">
    <td class="td">{{ delivery.type }}</td>
    <td class="td">{{ delivery.response_parser }}</td>
    <td class="td">{{ delivery.target }}</td>
    <td class="td">
      <slot/>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    delivery: {
      type: Object
    }
  }
}
</script>
