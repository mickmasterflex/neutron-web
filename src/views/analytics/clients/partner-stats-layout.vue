<template>
  <clients-layout hud-title="All Partner Clients"
                  :fetch-clients="fetchPartnerClientsStats"
                  :clients-route="{ name: 'PartnerStatsClients' }"
                  :leads-route="{ name: 'PartnerStatsClientsLeads' }"
  ></clients-layout>
</template>

<script>
import clientsLayout from '@/views/analytics/clients/layout'
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      fetchPartnerClientsStats: 'fetchPartnerClientsStats'
    })
  },
  components: {
    'clients-layout': clientsLayout
  }
}
</script>
