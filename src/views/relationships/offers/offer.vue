<template>
  <div v-if="offer">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{offer.name}}</h1>
      <div>
        <stat-card :data="offer.pk" :title="`Offer`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">Delete Offer</h3>
    <delete-offer :id="offer.pk" :client="client" :buyer="offer.contract"></delete-offer>

    <h3 class="h3 mt-5 mb-2">Update Offer</h3>
    <update-offer :id="offer.pk" :buyer="offer.contract"></update-offer>
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
    },
    client: {
      type: String
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
