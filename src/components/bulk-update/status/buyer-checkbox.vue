<template>
  <checkbox-field
    @input="handleInput"
    :field_id="`bulkUpdateBuyers-${contract}`"
    :value="checked"
  ></checkbox-field>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    contract: Number
  },
  computed: {
    ...mapGetters({
      bulkUpdateBuyers: 'getBulkUpdateBuyers'
    }),
    checked () {
      return this.bulkUpdateBuyers.includes(this.contract)
    }
  },
  methods: {
    ...mapMutations({
      addToBulkUpdate: 'ADD_BUYER_TO_BULK_UPDATE',
      removeFromBulkUpdate: 'REMOVE_BUYER_FROM_BULK_UPDATE'
    }),
    handleInput () {
      if (this.checked) {
        this.removeFromBulkUpdate(this.contract)
      } else {
        this.addToBulkUpdate(this.contract)
      }
    }
  }
}
</script>
