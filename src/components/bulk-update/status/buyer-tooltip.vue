<template>
  <status-tooltip
    type="buyer"
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
      selectedContracts: 'getBulkUpdateBuyers',
      showTooltip: 'getShowBulkUpdateBuyerStatus',
      loading: 'getBulkUpdateBuyerStatusPostLoading'
    })
  },
  methods: {
    ...mapActions({
      updateStatuses: 'bulkUpdateBuyerStatus'
    }),
    ...mapMutations({
      close: 'CLOSE_BULK_UPDATE_BUYER_STATUS',
      open: 'SHOW_BULK_UPDATE_BUYER_STATUS'
    })
  },
  components: {
    'status-tooltip': statusTooltip
  }
}
</script>
