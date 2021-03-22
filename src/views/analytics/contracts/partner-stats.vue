<template>
  <analytics-panel-template>
    <template slot="content">
      <contracts-list
        contract-route-name="PartnerStatsContract"
        leads-route-name="PartnerStatsContractLeads"
        :is-client-contracts="$route.name === 'PartnerStatsClientContracts'"
        :parent-contract-id="id"
      ></contracts-list>
    </template>
  </analytics-panel-template>
</template>

<script>
import analyticsPanelTemplate from '@/components/analytics/panel-template'
import contractsList from '@/components/analytics/contracts-list'

export default {
  props: {
    id: Number
  },
  components: {
    'analytics-panel-template': analyticsPanelTemplate,
    'contracts-list': contractsList
  }
}
</script>
