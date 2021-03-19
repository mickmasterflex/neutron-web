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
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
