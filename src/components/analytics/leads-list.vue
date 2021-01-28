<template>
  <transition-table-state>
    <table v-if="leads.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Lead Id</th>
        <th class="th">Lead Email</th>
        <th class="th">Campaign</th>
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
        <td class="td">{{lead.campaign}}</td>
        <td class="td">{{lead.revenue}}</td>
        <td class="td">{{lead.margin}}</td>
        <td class="td">{{lead.payout}}</td>
        <td class="td">{{lead.reason}}</td>
        <td class="td">{{lead.sold_at}}</td>
        <td class="td">{{lead.created_at}}</td>
        <td class="td">{{lead.updated_at}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No leads in selected date range"
                       key="empty"
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
  }
}
</script>
