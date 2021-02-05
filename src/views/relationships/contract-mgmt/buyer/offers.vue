<template>
  <div>
    <panel-template title="Offers List" class="col-span-2" :showLoader="loading" :loadingText="loadingText">
      <template slot="action">
        <button class="btn btn-turquoise" @click="showCreateOfferModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Offer</button>
      </template>
      <template slot="content">
        <offer-list :offers="offers" :client="buyer.client"></offer-list>
      </template>
    </panel-template>
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
      getOffersByBuyer: 'getOffersByBuyer',
      loading: 'getOffersFetchLoading',
      loadingText: 'getOffersFetchLoadingText'
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
