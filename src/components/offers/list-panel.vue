<template>
  <panel-template
    content-background-color="white"
    title="Offers"
    :showLoader="loading"
    :loading-text="loadingText">
    <template v-slot:action>
      <bulk-update-status v-if="offers.length" class="mr-2"></bulk-update-status>
      <button class="btn btn-turquoise" :disabled="createOfferDisabled" @click="showCreateOfferModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Offer</button>
    </template>
    <template v-slot:content>
      <offer-list v-bind="$attrs" :offers="offers"></offer-list>
    </template>
  </panel-template>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import offerList from '@/components/offers/bulk-update-list'
import bulkUpdateStatus from '@/components/bulk-update/status/offer-tooltip'

export default {
  props: {
    createOfferDisabled: {
      type: Boolean
    },
    offers: Array
  },
  components: {
    'offer-list': offerList,
    'bulk-update-status': bulkUpdateStatus
  },
  computed: {
    ...mapGetters({
      loading: 'getOffersFetchLoading',
      loadingText: 'getOffersFetchLoadingText'
    })
  },
  methods: {
    ...mapMutations({
      showCreateOfferModal: 'SHOW_CREATE_OFFER_MODAL'
    })
  }
}
</script>
