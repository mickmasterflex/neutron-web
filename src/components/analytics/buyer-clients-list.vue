<template>
  <transition-table-state>
    <table v-if="buyer_clients.length" class="table table-white">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">Leads</th>
        <th class="th">Sold Leads</th>
        <th class="th">Revenue</th>
        <th class="th">Margin</th>
        <th class="th">Payout</th>
        <th class="th">Scrub Rate</th>
        <th class="th">Margin Percent</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="client in buyer_clients" :key="client.id">
        <td class="td">{{client.name}}</td>
        <td class="td">{{client.lead_count}}</td>
        <td class="td">{{client.sold_count}}</td>
        <td class="td">{{client.revenue}}</td>
        <td class="td">{{client.margin}}</td>
        <td class="td">{{client.payout}}</td>
        <td class="td">{{client.scrub_rate}}</td>
        <td class="td">{{client.margin_percent}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No stats in selected date range"
                       key="empty"
                       copy="Try altering the date range"></table-empty-state>
  </transition-table-state>
</template>

<script>
export default {
  props: {
    buyer_clients: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {}
}
</script>
