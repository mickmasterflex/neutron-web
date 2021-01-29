<template>
  <transition-table-state>
    <table v-if="buyer_contracts.length" class="table table-striped">
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
      <tr class="tr" v-for="contract in buyer_contracts" :key="contract.id">
        <td class="td">
          <span class="text-link" @click="linkToBuyerStatsContract({ name: contract.name, id: contract.id })">{{contract.name}}</span>
        </td>
        <td class="td">{{contract.lead_count}}</td>
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
    buyer_contracts: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentBuyerStatsClient'
    })
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_BUYER_STATS_CONTRACT'
    }),
    linkToBuyerStatsContract (contract) {
      this.setCurrent(contract)
      this.$router.push({ name: 'BuyerStatsContract', params: { id: contract.id, clientId: this.client.id } })
    }
  }
}
</script>
