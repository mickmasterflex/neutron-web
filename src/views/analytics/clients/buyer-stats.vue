<template>
  <clients-index hud-title="All Buyer Clients"
                 :fetch-clients="fetchBuyerClientsStats"
                 :clients-route="{ name: 'BuyerStatsClients' }"
                 :leads-route="{ name: 'BuyerStatsClientsLeads' }"
  >
  </clients-index>
</template>

<script>
import clientsIndex from '@/views/analytics/clients/layout'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      fetchBuyerClientsStats: 'fetchBuyerClientsStats'
    })
  },
  components: {
    'clients-index': clientsIndex
  }
}
</script>
