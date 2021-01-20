<template>
  <status-checkbox
    :contract="contract"
    type="partner"
    :selectedContracts="bulkUpdatePartners"
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
      bulkUpdatePartners: 'getBulkUpdatePartners'
    })
  },
  methods: {
    ...mapMutations({
      addToBulkUpdate: 'ADD_PARTNER_TO_BULK_UPDATE',
      removeFromBulkUpdate: 'REMOVE_PARTNER_FROM_BULK_UPDATE'
    })
  },
  components: {
    'status-checkbox': statusCheckbox
  }
}
</script>
