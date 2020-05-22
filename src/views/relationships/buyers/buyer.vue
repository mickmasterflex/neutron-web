<template>
  <div v-if="buyer">
    <div class="hud">
      <h1 class="h1 text-white">{{buyer.name}}</h1>
      <div>
        <stat-card v-if="buyer.parent" :data="buyer.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="buyer.client" :title="`Client`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Offers List</h3>
    <offer-list :offers="offers"></offer-list>

    <h3 class="h3 mt-5 mb-2">Delete Buyer Contract</h3>
    <delete-buyer-contract :client="buyer.client" :id="id"></delete-buyer-contract>

    <h3 class="h3 mt-5 mb-2">Update Buyer Contract</h3>
    <update-buyer-contract :client="buyer.client" :id="id" ></update-buyer-contract>

    <h3 class="h3 mt-5 mb-2">Create Offer</h3>
    <create-offer :buyer="buyer.id"></create-offer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteBuyer from '@/components/buyers/delete'
import updateBuyer from '@/components/buyers/update'
import createOffer from '@/components/offers/create'
import offerList from '@/components/offers/list'

export default {
  props: {
    id: Number
  },
  components: {
    'delete-buyer-contract': deleteBuyer,
    'update-buyer-contract': updateBuyer,
    'create-offer': createOffer,
    'offer-list': offerList
  },
  computed: {
    ...mapGetters({
      offer: 'getCurrentOffer',
      buyer: 'getCurrentBuyer',
      getOffersByBuyer: 'getOffersByBuyer'
    }),
    offers: function () {
      return this.getOffersByBuyer(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentBuyer: 'fetchCurrentBuyer',
      fetchOffers: 'fetchOffers'
    })
  },
  created () {
    this.fetchCurrentBuyer(this.id)
    this.fetchOffers()
  }
}
</script>
