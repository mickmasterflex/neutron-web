<template>
  <analytics-panel-template>
    <template slot="content">
      <buyer-client-list v-if="$route.name === 'BuyerStatsClients'"></buyer-client-list>
      <partner-client-list v-if="$route.name === 'PartnerStatsClients'"></partner-client-list>
    </template>
  </analytics-panel-template>
</template>

<script>
import buyerClientList from '@/components/analytics/clients/buyer-clients-list'
import partnerClientList from '@/components/analytics/clients/partner-clients-list'
import analyticsPanelTemplate from '@/components/analytics/panel-template'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      clients: 'getAllClientsStats'
    })
  },
  components: {
    'buyer-client-list': buyerClientList,
    'partner-client-list': partnerClientList,
    'analytics-panel-template': analyticsPanelTemplate
  }
}
</script>
