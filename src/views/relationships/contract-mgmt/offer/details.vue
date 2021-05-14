<template>
  <base-panel-grid>
    <update-offer :offer="offer" class="col-span-2 xl:col-span-1"></update-offer>
    <recruitment-locations :geo="offer.geo" class="col-span-2 xl:col-span-1"></recruitment-locations>
    <lead-caps :caps-parent-id="id" caps-parent-type="offer-contracts"/>
    <panel-template title="Danger Zone" :showLoader="loading" :loadingText="loadingText" class="col-span-2">
      <template #content>
        <delete-offer :offer="offer" :client="$route.params.client"></delete-offer>
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapGetters } from 'vuex'
import recruitmentLocations from '@/components/geos/index'
import deleteOffer from '@/components/offers/delete'
import updateOffer from '@/components/offers/update'
import leadCaps from '@/components/caps/panel-template'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-offer': deleteOffer,
    'update-offer': updateOffer,
    'recruitment-locations': recruitmentLocations,
    'lead-caps': leadCaps
  },
  computed: {
    ...mapGetters({
      offer: 'getCurrentOffer',
      loading: 'getOfferFetchLoading',
      loadingText: 'getOfferFetchLoadingText',
      loadingCaps: 'getCapsFetchLoading',
      loadingCapsText: 'getCapsFetchLoadingText'
    })
  }
}
</script>
