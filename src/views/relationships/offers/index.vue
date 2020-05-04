<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">All Offers</h1>
      <div>
        <stat-card :data="getAllOffersCount" :title="`Offers`" :color="`teal`"></stat-card>
      </div>
    </div>
    <offer-list :contracts="offers"></offer-list>
    <h3 class="h3 mt-5 mb-2">Create Offer</h3>
    <create-offer></create-offer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import offerList from '@/components/offers/list'
import createOffer from '@/components/offers/create'

export default {
  components: {
    'offer-list': offerList,
    'create-offer': createOffer
  },
  computed: {
    ...mapGetters({
      offers: 'getAllOffers',
      getAllOffersCount: 'getAllOffersCount'
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
