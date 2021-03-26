<template>
  <base-panel-grid>
    <offer-list-panel class="col-span-2"
                      :offers="offers"
                      emptyStateCopy="Use the 'New Offer' button to add offers"
                      :createOfferDisabled="createOfferDisabled"
    ></offer-list-panel>
    <create-offer v-if="!createOfferDisabled" :buyer="buyer.id" :client="buyer.client_data.id"></create-offer>
  </base-panel-grid>
</template>
<script>
import createOffer from '@/components/offers/create'
import offerList from '@/components/offers/list-panel'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'create-offer': createOffer,
    'offer-list-panel': offerList
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      getOffersByBuyer: 'getOffersByBuyer'
    }),
    offers: function () {
      return this.getOffersByBuyer(this.buyer.id)
    },
    createOfferDisabled () {
      return !this.buyer
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
    if (!this.offers.length) {
      this.fetchOffers()
    }
  }
}
</script>
