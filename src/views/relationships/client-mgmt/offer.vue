<template>
  <content-layout v-if="offer">
    <template v-slot:hud>
      <h1 class="h1 text-white">{{offer.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="offer.id" :title="`Offer`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:content>
      <base-panel-grid>
        <update-offer :offer="offer" class="col-span-2 xl:col-span-1"></update-offer>
        <panel-template title="Danger Zone" :showLoader="loading" :loadingText="loadingText" class="col-span-2">
          <template #content>
            <delete-offer :offer="offer" :client="$route.params.client"></delete-offer>
          </template>
        </panel-template>
      </base-panel-grid>
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
      offer: 'getCurrentOffer',
      loading: 'getOfferFetchLoading',
      loadingText: 'getOfferFetchLoadingText'
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
