<template>
  <status-checkbox
    :contract="contract"
    type="buyer"
    :selectedContracts="bulkUpdateBuyers"
    :addToSelected="addToBulkUpdate"
    :removeFromSelected="removeFromBulkUpdate"
  ></status-checkbox>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import statusCheckbox from '@/components/bulk-update/status/base-checkbox'

export default {
  props: {
    contract: Number
  },
  computed: {
    ...mapGetters({
      bulkUpdateBuyers: 'getBulkUpdateBuyers'
    })
  },
  methods: {
    ...mapMutations({
      addToBulkUpdate: 'ADD_BUYER_TO_BULK_UPDATE',
      removeFromBulkUpdate: 'REMOVE_BUYER_FROM_BULK_UPDATE'
    })
  },
  components: {
    'status-checkbox': statusCheckbox
  }
}
</script>
