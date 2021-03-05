<template>
  <client-layout :id="id"
                 :client="partnerClient"
                 :fetchClient="fetchPartnerClientStats"
                 :contracts-route="{ name: 'PartnerStatsClientContracts', query: $route.query }"
                 :leads-route="{ name: 'PartnerStatsClientLeads', query: $route.query }"
                 :contracts-count="contracts.length"
  ></client-layout>
</template>

<script>
import clientLayout from '@/views/analytics/client/layout'
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
      partnerClient: 'getCurrentPartnerStatsClient',
      contracts: 'getPartnerClientContractsParentless'
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
