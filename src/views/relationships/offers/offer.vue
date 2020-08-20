<template>
  <content-layout v-if="offer">
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">{{offer.name}}</h1>
        <div class="hud--stat-cards">
          <stat-card :data="offer.id" :title="`Offer`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <update-offer :offer="offer"></update-offer>
      <delete-offer :offer="offer" :client="$route.params.client" class="mt-4"></delete-offer>
    </template>
  </content-layout>
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
