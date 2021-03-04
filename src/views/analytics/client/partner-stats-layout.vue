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
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    }
  },
  data () {
    return {
      PartnerStatsClients: {
        name: 'PartnerStatsClients',
        text: 'All Clients',
        query: this.$route.query
      },
      PartnerStatsClientContracts: {
        name: 'PartnerStatsClientContracts',
        text: this.$route.params.id,
        params: { id: this.$route.params.id },
        query: this.$route.query
      }
    }
  },
  computed: {
    breadcrumbs () {
      return [
        this.PartnerStatsClients,
        this.PartnerStatsClientContracts
      ]
    },
    ...mapGetters({
      partnerClient: 'getCurrentPartnerStatsClient',
      contracts: 'getPartnerClientContractsParentless'
    })
  },
  watch: {
    partnerClient () {
      this.PartnerStatsClientContracts.text = this.partnerClient.name
      this.setBreadcrumbs(this.breadcrumbs)
    }
  },
  created () {
    this.setBreadcrumbs(this.breadcrumbs)
  },
  methods: {
    ...mapActions({
      fetchPartnerClientStats: 'fetchPartnerClientStats'
    }),
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  },
  components: {
    'client-layout': clientLayout
  }
}
</script>
