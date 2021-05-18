<template>
  <tr class="tr">
    <td class="td">{{ delivery.type }}</td>
    <td class="td">{{ delivery.response_parser }}</td>
    <td class="td">{{ delivery.target }}</td>
    <td class="td">
      <select-revenue-method :delivery-id="delivery.id"></select-revenue-method>
    </td>
    <td class="td">
      <slot/>
    </td>
  </tr>
</template>

<script>
import revenueMethodSelect from '@/components/contracts/buyers/revenue-method-switch'

export default {
  props: {
    delivery: {
      type: Object,
      required: true
    }
  },
  components: {
    'select-revenue-method': revenueMethodSelect
  }
}
</script>
