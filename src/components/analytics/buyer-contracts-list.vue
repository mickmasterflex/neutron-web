<template>
  <transition-table-state>
    <table v-if="buyer_stats_contracts.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Name</th>
        <th class="th">Contracts</th>
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
      <tr class="tr" v-for="contract in buyer_stats_contracts" :key="contract.id">
        <td class="td">
          <span class="text-link" @click="linkToContract({ name: contract.name, id: contract.id })">{{contract.name}}</span>
        </td>
        <td class="td">
          <table-link v-if="contractsCount(contract.id)" @table-link-click="linkToContractContracts({ name: contract.name, id: contract.id })">
            {{ contractsCount(contract.id) }}
          </table-link>
          <span v-else class="italic text-gray-500">None</span>
        </td>
        <td class="td">
          <table-link v-if="contract.lead_count" @table-link-click="linkToContractLeads({ name: contract.name, id: contract.id })">
            {{contract.lead_count}}
          </table-link>
          <span v-else class="italic text-gray-500">None</span>
        </td>
        <td class="td">{{contract.sold_count}}</td>
        <td class="td">{{contract.revenue}}</td>
        <td class="td">{{contract.margin}}</td>
        <td class="td">{{contract.payout}}</td>
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
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    buyer_stats_contracts: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentBuyerStatsClient',
      contractsCount: 'getBuyerStatsContractsByParentCount'
    })
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_BUYER_STATS_CONTRACT'
    }),
    linkToContractLeads (contract) {
      this.setCurrent(contract)
      this.$router.push({ name: 'BuyerStatsContractLeads', params: { id: contract.id, clientId: this.client.id } })
    },
    linkToContractContracts (contract) {
      this.setCurrent(contract)
      this.$router.push({ name: 'BuyerStatsContractContracts', params: { id: contract.id, clientId: this.client.id } })
    },
    linkToContract (contract) {
      this.setCurrent(contract)
      this.$router.push({ name: 'BuyerStatsContract', params: { id: contract.id, clientId: this.client.id } })
    }
  }
}
</script>
