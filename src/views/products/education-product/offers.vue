<template>
  <div>
    <panel-template title="Offers List" :show-loader="loading" :loading-text="loadingText" content-background-color="white">
      <template slot="content">
        <offer-list :offers="offers" emptyStateHeading="No offers use this product" emptyStateCopy="When creating an offer under a buyer contract, select this product."></offer-list>
      </template>
    </panel-template>
  </div>
</template>

<script>
import offerList from '@/components/offers/list'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'offer-list': offerList
  },
  computed: {
    ...mapGetters({
      getOffersByBuyer: 'getOffersByBuyer',
      getOffersByProduct: 'getOffersByProduct',
      educationProduct: 'getCurrentEducationProduct',
      loading: 'getOffersFetchLoading',
      loadingText: 'getOffersFetchLoadingText'
    }),
    offers: function () {
      return this.getOffersByProduct(this.educationProduct.id)
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
