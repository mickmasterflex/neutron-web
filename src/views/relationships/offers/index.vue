<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">All Offers</h1>
      <div>
        <stat-card :data="offer_count" :title="`Offers`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">All Offers</h3>
    <offers-list :contracts="offers"></offers-list>
  </div>
</template>

<script>
import offersList from '@/components/offers/list'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'offers-list': offersList
  },
  computed: {
    ...mapGetters({
      offers: 'getAllOffers',
      offer_count: 'getAllOffersCount'
    })
  },
  methods: {
    ...mapActions({ fetchOffers: 'fetchOffers' })
  },
  created () {
    this.fetchOffers()
  }
}
</script>
