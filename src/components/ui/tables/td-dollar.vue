<template>
  <td class="td">${{Number(dollar).toLocaleString()}}</td>
</template>

<script>
export default {
  props: {
    dollar: {
      required: true,
      type: [Number, String]
    }
  }
}
</script>
