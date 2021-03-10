<template>
  <leads-list
    :leads="leads"
    empty-state-heading="No Results"
    empty-state-copy="Try modifying your search"
  >
    <template v-slot:additional-th>
      <th class="th">Buyer Client</th>
      <th class="th">Buyer Contract</th>
      <th class="th">Partner Client</th>
      <th class="th">Partner Contract</th>
    </template>
    <template v-slot:additional-td="slotProps">
      <td class="td">
        <router-link
          :to="{
            name: 'Client',
            params: {
              slug: slotProps.lead.partner_client.slug
            }
          }"
          class="text-link"
        >{{slotProps.lead.partner_client.name}}</router-link>
      </td>
      <td class="td">
        <router-link
          :to="{
            name: 'BuyerContract',
            params: {
              id: slotProps.lead.buyer_client.id,
              client: slotProps.lead.buyer_client.slug
            }
          }"
          class="text-link"
        >{{slotProps.lead.buyer_contract.name}}</router-link>
      </td>
      <td class="td">
        <router-link
          :to="{
            name: 'Client',
            params: {
              slug: slotProps.lead.partner_client.slug
            }
          }"
          class="text-link"
        >{{slotProps.lead.partner_client.name}}</router-link>
      </td>
      <td class="td">
        <router-link
          :to="{
            name: 'PartnerContract',
            params: {
              client: slotProps.lead.partner_client.slug,
              id: slotProps.lead.partner_contract.id
            }
          }"
          class="text-link"
        >{{slotProps.lead.partner_client.name}}</router-link>
      </td>
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
