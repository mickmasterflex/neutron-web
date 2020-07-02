<template>
  <buyer-layout :id="id" contentTab="offers">
    <template v-slot:content>
      <div class="flex flex-row justify-between">
        <h3 class="h3">Offers List</h3>
        <button class="btn btn-green" @click="showCreateOfferModal()">Create Offer</button>
      </div>
      <offer-list :offers="offers"></offer-list>
      <create-offer :buyer="buyer.id"></create-offer>
    </template>
  </buyer-layout>
</template>

<script>
import buyerLayout from '@/views/relationships/buyers/buyer/layout'
import createOffer from '@/components/offers/create'
import offerList from '@/components/offers/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'buyer-layout': buyerLayout,
    'create-offer': createOffer,
    'offer-list': offerList
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      getOffersByBuyer: 'getOffersByBuyer'
    }),
    offers: function () {
      return this.getOffersByBuyer(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchOffers: 'fetchOffers'
    }),
    ...mapMutations({
      showCreateOfferModal: 'SHOW_CREATE_OFFER_MODAL'
    })
  },
  created () {
    this.fetchOffers()
  }
}
</script>
