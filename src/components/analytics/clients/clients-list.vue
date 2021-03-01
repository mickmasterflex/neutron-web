<template>
  <transition-table-state>
    <table v-if="clients.length" class="table table-striped">
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
      <tr class="tr" v-for="client in clients" :key="client.id">
        <td class="td">
          <span class="text-link" @click="linkToClient(client)">{{client.name}}</span>
        </td>
        <td class="td">
          <table-link v-if="client.lead_count" @table-link-click="linkToClientLeads({ name: client.name, id: client.id })">
            {{client.lead_count}}
          </table-link>
          <span v-else class="italic text-gray-500">None</span>
        </td>
        <td class="td">{{client.sold_count}}</td>
        <td-dollar :dollar="client.revenue"></td-dollar>
        <td-dollar :dollar="client.margin"></td-dollar>
        <td-dollar :dollar="client.payout"></td-dollar>
        <td class="td">{{client.scrub_rate}}</td>
        <td class="td">{{client.margin_percent}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No stats in selected date range"
                       key="empty"
                       class="well"
                       copy="Try altering the date range"></table-empty-state>
  </transition-table-state>
</template>

<script>
export default {
  props: {
    clients: {
      type: [Object, Array],
      required: true
    },
    linkToClient: {
      type: Function,
      required: true
    },
    linkToClientLeads: {
      type: Function,
      required: true
    }
  }
}
</script>
