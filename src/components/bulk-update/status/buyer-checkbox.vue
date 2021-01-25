<template>
  <status-checkbox
    :contract="contract"
    type="buyer"
    :selectedContracts="bulkUpdateBuyers"
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
      bulkUpdateBuyers: 'getBulkUpdateBuyers',
      savedShiftClickIndex: 'getBulkUpdateBuyersShiftClickIndex'
    })
  },
  methods: {
    ...mapMutations({
      addToBulkUpdate: 'ADD_BUYER_TO_BULK_UPDATE',
      removeFromBulkUpdate: 'REMOVE_BUYER_FROM_BULK_UPDATE',
      setSavedShiftClickIndex: 'SET_BULK_UPDATE_BUYERS_SHIFT_CLICK_INDEX'
    })
  },
  components: {
    'status-checkbox': statusCheckbox
  }
}
</script>
