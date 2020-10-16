<template>
  <tr class="tr">
    <td class="td">{{ location }}</td>
    <td :class="`td font-bold text-${found ? 'green' : 'red'}-500`">{{ found }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    location: String,
    found: Boolean
  }
}
</script>
