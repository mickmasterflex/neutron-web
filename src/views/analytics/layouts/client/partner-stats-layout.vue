<template>
  <client-layout :id="id"
                 :client="partnerClient"
                 :fetchClient="fetchPartnerClientStats"
                 contracts-route-name="PartnerStatsClientContracts"
                 leads-route-name="PartnerStatsClientLeads"
                 :contracts-count="contracts.length"
  ></client-layout>
</template>

<script>
import clientLayout from '@/views/analytics/layouts/client/layout'
import { mapActions, mapGetters } from 'vuex'
import { partnerClientBreadcrumbs } from '@/mixins/breadcrumbs/analytics/client/partner'

export default {
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      partnerClient: 'getCurrentClientStats',
      contracts: 'getCurrentStatsContractsParentless'
    })
  },
  methods: {
    ...mapActions({
      fetchPartnerClientStats: 'fetchPartnerClientStats'
    })
  },
  mixins: [partnerClientBreadcrumbs],
  components: {
    'client-layout': clientLayout
  }
}
</script>
