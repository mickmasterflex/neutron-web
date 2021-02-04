<template>
  <clients-index hud-title="All Partner Clients"
                 :fetch-clients="fetchPartnerClientsStats"
                 :clients-route="{ name: 'PartnerStatsClients' }"
                 :leads-route="{ name: 'PartnerStatsClientsLeads' }"
  >
  </clients-index>
</template>

<script>
import clientsIndex from '@/views/analytics/clients/layout'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      fetchPartnerClientsStats: 'fetchPartnerClientsStats'
    })
  },
  components: {
    'clients-index': clientsIndex
  }
}
</script>
