<tempalte>
  <td class="td">${{Number(dollar).toLocaleString()}}</td>
</tempalte>

<script>
export default {
  props: {
    dollar: {
      required: true,
      type: Number
    }
  }
}
</script>
