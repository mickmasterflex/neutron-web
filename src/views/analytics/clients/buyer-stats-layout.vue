<template>
  <clients-layout hud-title="All Buyer Clients"
                 :clients-route="{ name: 'BuyerStatsClients', query: $route.query }"
                 :leads-route="{ name: 'BuyerStatsClientsLeads', query: $route.query }"
  >
  </clients-layout>
</template>

<script>
import clientsLayout from '@/views/analytics/clients/layout'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import dayjs from 'dayjs'

export default {
  methods: {
    ...mapActions({
      fetchBuyerClientsStats: 'fetchBuyerClientsStats'
    }),
    ...mapMutations({
      setStart: 'SET_ANALYTICS_START_DATE',
      setEnd: 'SET_ANALYTICS_END_DATE'
    })
  },
  mounted () {
    this.setStart(dayjs(this.$route.query.start_date))
    this.setEnd(dayjs(this.$route.query.end_date))
  },
  computed: {
    ...mapGetters({
      analyticsDateRange: 'getAnalyticsDateRange'
    })
  },
  watch: {
    analyticsDateRange () {
      this.fetchBuyerClientsStats()
    }
  },
  components: {
    'clients-layout': clientsLayout
  }
}
</script>
