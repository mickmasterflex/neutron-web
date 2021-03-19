<template>
  <leads-list :leads="leads">
    <template v-slot:additional-th>
      <th class="th">Brand</th>
      <th class="th">Partner Client</th>
      <th class="th">Code</th>
    </template>
    <template v-slot:additional-td="slotProps">
      <td class="td">{{slotProps.lead.brand.name}}</td>
      <td class="td">{{slotProps.lead.partner_client.name}}</td>
      <td class="td">{{slotProps.lead.campaign.code}}</td>
    </template>
  </leads-list>
</template>

<script>
import baseLeadsList from '@/components/analytics/leads/lists/leads-list'

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
