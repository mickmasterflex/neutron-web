<template>
  <status-checkbox
    :contract="contract"
    type="partner"
    :selectedContracts="bulkUpdatePartners"
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
      bulkUpdatePartners: 'getBulkUpdatePartners',
      savedShiftClickIndex: 'getBulkUpdatePartnersShiftClickIndex'
    })
  },
  methods: {
    ...mapMutations({
      addToBulkUpdate: 'ADD_PARTNER_TO_BULK_UPDATE',
      removeFromBulkUpdate: 'REMOVE_PARTNER_FROM_BULK_UPDATE',
      setSavedShiftClickIndex: 'SET_BULK_UPDATE_PARTNERS_SHIFT_CLICK_INDEX'
    })
  },
  components: {
    'status-checkbox': statusCheckbox
  }
}
</script>
