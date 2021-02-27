<template>
  <status-checkbox
    :contract="contract"
    type="offer"
    :selectedContracts="bulkUpdateOffers"
    :addToSelected="addToBulkUpdate"
    :removeFromSelected="removeFromBulkUpdate"
    :shiftClickIndex="index"
    :shiftClickList="contracts"
    :savedShiftClickIndex="savedShiftClickIndex"
    :setSavedShiftClickIndex="setSavedShiftClickIndex"
  ></status-checkbox>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import statusCheckbox from '@/components/bulk-update/status/base-checkbox'

export default {
  props: {
    contract: Number,
    index: Number,
    contracts: Array
  },
  computed: {
    ...mapGetters({
      bulkUpdateOffers: 'getBulkUpdateOffers',
      savedShiftClickIndex: 'getBulkUpdateOffersShiftClickIndex'
    })
  },
  methods: {
    ...mapMutations({
      addToBulkUpdate: 'ADD_OFFER_TO_BULK_UPDATE',
      removeFromBulkUpdate: 'REMOVE_OFFER_FROM_BULK_UPDATE',
      setSavedShiftClickIndex: 'SET_BULK_UPDATE_OFFERS_SHIFT_CLICK_INDEX'
    })
  },
  components: {
    'status-checkbox': statusCheckbox
  }
}
</script>
