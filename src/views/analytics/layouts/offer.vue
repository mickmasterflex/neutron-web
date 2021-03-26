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
import analyticsLayout from '@/views/analytics/layouts/analytics-layout.vue'
import { mapActions, mapGetters } from 'vuex'
import { offerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/offer'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      offer: 'getCurrentOfferContractStats'
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
