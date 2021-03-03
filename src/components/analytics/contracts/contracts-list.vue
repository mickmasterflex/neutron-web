<template>
  <transition-table-state>
    <table v-if="contracts.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Contract</th>
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
      <tr class="tr" v-for="contract in contracts" :key="contract.id">
        <td class="td">
          <span class="text-link" @click="linkToContract({ name: contract.name, id: contract.id })">{{contract.name}}</span>
        </td>
        <td class="td">
          <table-link v-if="contract.lead_count" @table-link-click="linkToContractLeads({ name: contract.name, id: contract.id })">
            {{contract.lead_count.toLocaleString()}}
          </table-link>
          <span v-else class="italic text-gray-500">None</span>
        </td>
        <td-number :number="contract.sold_count"></td-number>
        <td-number :dollar="true" :number="contract.revenue"></td-number>
        <td-number :dollar="true" :number="contract.margin"></td-number>
        <td-number :dollar="true" :number="contract.payout"></td-number>
        <td class="td">{{contract.scrub_rate}}</td>
        <td class="td">{{contract.margin_percent}}</td>
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
    contracts: {
      type: Array,
      required: true
    },
    linkToContract: {
      type: Function,
      required: true
    },
    linkToContractLeads: {
      type: Function,
      required: true
    },
    contractsCount: {
      type: Function,
      required: true
    }
  }
}
</script>
