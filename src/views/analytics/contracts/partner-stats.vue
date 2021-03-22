<template>
  <analytics-panel-template>
    <template slot="content">
      <contracts-list
        contract-route-name="PartnerStatsContract"
        leads-route-name="PartnerStatsContractLeads"
        :is-client-contracts="$route.name === 'PartnerStatsClientContracts'"
        :parent-contract-id="id"
      >
        <template v-slot:additional-th>
          <th class="th">Campaigns</th>
        </template>
        <template v-slot:additional-td="slotProps">
          <td class="td">
            <table-link :number="slotProps.contract.campaign_count"
                        @table-link-click="linkToContractCampaigns({ name: slotProps.contract.name, id: slotProps.contract.id })"
            ></table-link>
          </td>
        </template>
      </contracts-list>
    </template>
  </analytics-panel-template>
</template>

<script>
import analyticsPanelTemplate from '@/components/analytics/panel-template'
import contractsList from '@/components/analytics/contracts-list'
import { mapMutations } from 'vuex'

export default {
  props: {
    id: Number,
    clientId: Number
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_CONTRACT_STATS',
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    linkToContractCampaigns (contract) {
      this.resetLeads()
      this.setCurrent(contract)
      this.$router.push({
        name: 'PartnerStatsContractCampaigns',
        params: { id: contract.id, clientId: this.clientId },
        query: this.$route.query
      })
    }
  },
  components: {
    'analytics-panel-template': analyticsPanelTemplate,
    'contracts-list': contractsList
  }
}
</script>
