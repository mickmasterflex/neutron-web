<template>
  <client-layout :id="id"
                 :client="buyerClient"
                 :fetchClient="fetchBuyerClientStats"
                 :contracts-route="{ name: 'BuyerStatsClientContracts', query: $route.query }"
                 :leads-route="{ name: 'BuyerStatsClientLeads', query: $route.query }"
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
      BuyerStatsClients: {
        name: 'BuyerStatsClients',
        text: 'All Clients',
        query: this.$route.query
      },
      BuyerStatsClientContracts: {
        name: 'BuyerStatsClientContracts',
        text: this.$route.params.id,
        params: { id: this.$route.params.id },
        query: this.$route.query
      }
    }
  },
  computed: {
    breadcrumbs () {
      return [
        this.BuyerStatsClients,
        this.BuyerStatsClientContracts
      ]
    },
    ...mapGetters({
      buyerClient: 'getCurrentBuyerStatsClient',
      contracts: 'getBuyerClientContractsParentless'
    })
  },
  watch: {
    buyerClient () {
      this.BuyerStatsClientContracts.text = this.buyerClient.name
      this.setBreadcrumbs(this.breadcrumbs)
    }
  },
  created () {
    this.setBreadcrumbs(this.breadcrumbs)
  },
  methods: {
    ...mapActions({
      fetchBuyerClientStats: 'fetchBuyerClientStats'
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
