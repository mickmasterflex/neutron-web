<template>
  <div>
    <action-heading>
      <template v-slot:left>
        <h2 class="h3">Offers List</h2>
      </template>
      <template v-slot:right>
        <button class="btn btn-turquoise" @click="showCreateOfferModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Offer</button>
      </template>
    </action-heading>
    <offer-list :offers="offers" :client="$route.params.client"></offer-list>
    <create-offer :buyer="buyer.id"></create-offer>
  </div>
</template>

<script>
import createOffer from '@/components/offers/create'
import offerList from '@/components/offers/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'create-offer': createOffer,
    'offer-list': offerList
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      getOffersByBuyer: 'getOffersByBuyer'
    }),
    offers: function () {
      return this.getOffersByBuyer(this.buyer.id)
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
