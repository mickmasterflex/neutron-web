<template>
  <base-panel-grid>
        <update-offer :offer="offer" class="col-span-2 xl:col-span-1"></update-offer>
        <panel-template title="Danger Zone" :showLoader="loading" :loadingText="loadingText" class="col-span-2">
          <template #content>
            <delete-offer :offer="offer" :client="$route.params.client"></delete-offer>
          </template>
        </panel-template>
      </base-panel-grid>
    </template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_OFFER'
    }),
    async setOffer () {
      if (this.offer.id !== this.id) {
        await this.fetchCurrentOffer(this.id)
      }
    }
  },
  created () {
    this.setOffer().then(() => {
      document.title = this.offer.name
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
