<template>
  <div>
    <div class="hud">
      <h1 class="h1 text-white">All Offers</h1>
      <div class="hud--stat-cards">
        <stat-card :data="offerCount" :title="`Offers`" :color="`teal`"></stat-card>
      </div>
    </div>
    <offer-list :offers="offers" class="mt-5"></offer-list>
    <h3 class="h3 mt-5 mb-2">Create Offer</h3>
    <create-offer :offers="offers"></create-offer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import offerList from '@/components/offers/list'
import createOffer from '@/components/offers/create'

export default {
  props: {
    buyer: Number
  },
  components: {
    'offer-list': offerList,
    'create-offer': createOffer
  },
  computed: {
    ...mapGetters({
      getOffersByBuyer: 'getOffersByBuyer'
    }),
    offers: function () {
      return this.getOffersByBuyer(this.buyer)
    },
    offerCount: function () {
      return this.offers.length
    }
  },
  methods: {
    ...mapActions({ fetchOffers: 'fetchOffers' })
  },
  created () {
    this.fetchOffers()
  }
}
</script>
