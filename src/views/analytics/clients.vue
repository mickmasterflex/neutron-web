<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="content">
      <buyer-client-list v-if="$route.name === 'BuyerStatsClients'"></buyer-client-list>
      <partner-client-list v-if="$route.name === 'PartnerStatsClients'"></partner-client-list>
    </template>
  </panel-template>
</template>

<script>
import buyerClientList from '@/components/analytics/clients/buyer-clients-list'
import partnerClientList from '@/components/analytics/clients/partner-clients-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      clients: 'getAllClientsStats',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchPartnerCSV: 'fetchPartnerClientsLeadsCSV',
      fetchBuyerCSV: 'fetchBuyerClientsLeadsCSV'
    }),
    fetchCSV (id) {
      if (this.$route.name === 'BuyerStatsClients') {
        this.fetchBuyerCSV(id)
      } else {
        this.fetchPartnerCSV(id)
      }
    }
  },
  components: {
    'buyer-client-list': buyerClientList,
    'partner-client-list': partnerClientList,
    'date-range-picker': dateRangePicker
  }
}
</script>
