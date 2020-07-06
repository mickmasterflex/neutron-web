<template>
  <buyer-layout :id="id" contentTab="offers">
    <template v-slot:content>
      <action-heading>
        <template v-slot:heading>
          <h2 class="h3">Offers List</h2>
        </template>
        <template v-slot:right>
          <button class="btn btn-turquoise" @click="showCreateOfferModal()"><font-awesome-icon icon="plus"></font-awesome-icon> Create Offer</button>
        </template>
      </action-heading>
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
