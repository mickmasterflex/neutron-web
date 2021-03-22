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
            <table-link :number="getDescendantData(contract, 'lead_count')"
                        @table-link-click="linkToContractLeads({ name: contract.name, id: contract.id })"
            ></table-link>
          </td>
          <td-number :number="getDescendantData(contract, 'sold_count')"></td-number>
          <td-number :dollar="true" :number="getDescendantData(contract, 'revenue')"></td-number>
          <td-number :dollar="true" :number="getDescendantData(contract, 'margin')"></td-number>
          <td-number :dollar="true" :number="getDescendantData(contract, 'payout')"></td-number>
          <td class="td">{{getDescendantData(contract, 'scrub_rate')}}</td>
          <td class="td">{{getDescendantData(contract, 'margin_percent')}}</td>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    parentContractId: {
      type: Number
    },
    isClientContracts: {
      type: Boolean,
      required: true
    },
    contractRouteName: {
      type: String,
      required: true,
      validator: function (value) {
        return ['BuyerStatsContract', 'PartnerStatsContract'].includes(value)
      }
    },
    leadsRouteName: {
      type: String,
      required: true,
      validator: function (value) {
        return ['BuyerStatsContractLeads', 'PartnerStatsContractLeads'].includes(value)
      }
    }
  },
  computed: {
    ...mapGetters({
      descendantContractDataById: 'getCurrentStatsDescendantContractDataById',
      parentlessContracts: 'getCurrentStatsContractsParentless',
      contractsByParent: 'getCurrentStatsContractsByParent',
      client: 'getCurrentClientStats'
    }),
    contracts () {
      if (this.isClientContracts === true) {
        return this.parentlessContracts
      }
      return this.contractsByParent(this.parentContractId)
    }
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_CONTRACT_STATS',
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    linkToContract (contract) {
      this.setCurrent(contract)
      this.$router.push({
        name: this.contractRouteName,
        params: { id: contract.id, clientId: this.client.id },
        query: this.$route.query
      })
    },
    linkToContractLeads (contract) {
      this.resetLeads()
      this.setCurrent(contract)
      this.$router.push({
        name: this.leadsRouteName,
        params: { id: contract.id, clientId: this.client.id },
        query: this.$route.query
      })
    },
    getDescendantData (contract, key) {
      if (this.descendantContractDataById(contract.id)[0]) {
        return this.descendantContractDataById(contract.id)[0][key]
      }
      return contract[key]
    }
  }
}
</script>
