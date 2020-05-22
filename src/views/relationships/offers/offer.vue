<template>
  <div v-if="offer">
    <div class="hud">
      <h1 class="h1 text-white">{{offer.name}}</h1>
      <div>
        <stat-card :data="offer.id" :title="`Offer`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Delete Offer</h3>
    <delete-offer :offer="offer" ></delete-offer>

    <h3 class="h3 mt-5 mb-2">Update Offer</h3>
    <update-offer :offer="offer" :id="id"></update-offer>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import deleteOffer from '@/components/offers/delete'
import updateOffer from '@/components/offers/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-offer': deleteOffer,
    'update-offer': updateOffer
  },
  computed: {
    ...mapGetters({
      offer: 'getCurrentOffer'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentOffer: 'fetchCurrentOffer',
      fetchOfferByBuyer: 'fetchOfferByBuyer',
      fetchBuyers: 'fetchBuyers'
    })
  },
  created () {
    this.fetchCurrentOffer(this.id)
  }
}
</script>
