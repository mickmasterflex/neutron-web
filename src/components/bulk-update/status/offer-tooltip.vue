<template>
  <status-tooltip
    type="offer"
    :close="close"
    :open="open"
    :updateStatuses="updateStatuses"
    :selectedContracts="selectedContracts"
    :showTooltip="showTooltip"
    :loading="loading"
  ></status-tooltip>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import statusTooltip from '@/components/bulk-update/status/base-tooltip'

export default {
  computed: {
    ...mapGetters({
      selectedContracts: 'getBulkUpdateOffers',
      showTooltip: 'getShowBulkUpdateOfferStatus',
      loading: 'getBulkUpdateOfferStatusPostLoading'
    })
  },
  methods: {
    ...mapActions({
      updateStatuses: 'bulkUpdateOfferStatus'
    }),
    ...mapMutations({
      close: 'CLOSE_BULK_UPDATE_OFFER_STATUS',
      open: 'SHOW_BULK_UPDATE_OFFER_STATUS'
    })
  },
  components: {
    'status-tooltip': statusTooltip
  }
}
</script>
