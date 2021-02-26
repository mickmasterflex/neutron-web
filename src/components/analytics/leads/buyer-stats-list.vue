<template>
  <leads-list :leads="leads">
    <template v-slot:additional-th>
      <th class="th">Buyer Client</th>
      <th class="th">Buyer Contract</th>
      <th class="th">Brand</th>
      <th class="th">Campus</th>
      <th class="th">Offer</th>
      <th class="th">Partner Client</th>
    </template>
    <template v-slot:additional-td="slotProps">
      <td class="td">{{slotProps.lead.buyer_client.name}}</td>
      <td class="td">{{slotProps.lead.buyer_contract.name}}</td>
      <td class="td">{{slotProps.lead.brand.name}}</td>
      <td class="td">{{slotProps.lead.campus.name}}</td>
      <td class="td">{{slotProps.lead.offer_contract.name}}</td>
      <td class="td">{{slotProps.lead.partner_client.name}}</td>
    </template>
  </leads-list>
</template>

<script>
import baseLeadsList from '@/components/analytics/leads/leads-list'

export default {
  props: {
    leads: {
      type: [Object, Array],
      required: true
    }
  },
  components: {
    'leads-list': baseLeadsList
  }
}
</script>
