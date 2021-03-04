<template>
  <analytics-layout
    :hud-title="offer.name"
    :fetch-stats="fetchOfferContractStats"
    :fetch-id="id"
  >
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </analytics-layout>
</template>

<script>
import analyticsLayout from '@/views/analytics/layout.vue'
import { mapActions, mapGetters } from 'vuex'
import { offerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics-contract/offer-breadcrumbs'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      offer: 'getCurrentBuyerStatsOffer'
    })
  },
  methods: {
    ...mapActions({
      fetchOfferContractStats: 'fetchOfferContractStats'
    })
  },
  watch: {
    offer () {
      document.title = this.offer.name
    }
  },
  mixins: [offerContractBreadcrumbs],
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
