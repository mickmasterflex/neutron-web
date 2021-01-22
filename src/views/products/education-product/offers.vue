<template>
  <div>
    <panel-template title="Offers List">
      <template slot="content">
        <offer-list :offers="offers" emptyStateHeading="No Offers Use This Product" emptyStateCopy="When creating an offer under a buyer contract select this offer." ></offer-list>
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
      educationProduct: 'getCurrentEducationProduct'
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
