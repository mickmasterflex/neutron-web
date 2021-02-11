<template>
  <transition-table-state>
    <table v-if="leads.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Lead Id</th>
        <th class="th">Lead Email</th>
        <th class="th">Brand</th>
        <th class="th">Campus</th>
        <th class="th">Partner Client</th>
        <th class="th">Partner Contract</th>
        <th class="th">Campaign</th>
        <th class="th">Buyer Client</th>
        <th class="th">Buyer Contract</th>
        <th class="th">Offer</th>
        <th class="th">Revenue</th>
        <th class="th">Margin</th>
        <th class="th">Payout</th>
        <th class="th">Scrub Reason</th>
        <th class="th">Sold</th>
        <th class="th">Created At</th>
        <th class="th">Updated At</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="lead in leads" :key="lead.id">
        <td class="td">{{lead.id}}</td>
        <td class="td">{{lead.data.email}}</td>
        <td class="td">{{lead.brand.name}}</td>
        <td class="td">{{lead.campus.name}}</td>
        <td class="td">{{lead.partner_client.name}}</td>
        <td class="td">{{lead.partner_contract.name}}</td>
        <td class="td">{{lead.campaign.name}}</td>
        <td class="td">{{lead.buyer_client.name}}</td>
        <td class="td">{{lead.buyer_contract.name}}</td>
        <td class="td">{{lead.offer_contract.name}}</td>
        <td class="td">{{lead.revenue}}</td>
        <td class="td">{{lead.margin}}</td>
        <td class="td">{{lead.payout}}</td>
        <td class="td" :class="!lead.reason ? 'text-gray-500 italic' : ''">{{lead.reason ? lead.reason : 'None'}}</td>
        <td class="td" :class="!lead.sold_at ? 'text-red-500 font-bold' : ''">{{leadSold(lead.sold_at)}}</td>
        <td class="td">{{new Date(lead.created_at).toDateString()}}</td>
        <td class="td">{{new Date(lead.updated_at).toDateString()}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No leads in selected date range"
                       key="empty"
                       class="well"
                       copy="Try altering the date range"></table-empty-state>
  </transition-table-state>
</template>

<script>
export default {
  props: {
    leads: {
      type: [Object, Array],
      required: true
    }
  },
  methods: {
    leadSold (soldAt) {
      if (soldAt) {
        return new Date(soldAt).toDateString
      } else {
        return false
      }
    }
  }
}
</script>
