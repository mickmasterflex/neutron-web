<template>
  <checkbox-field :value="contractRelation.suppressed"
                  :field_id="`suppressed-${contractRelation.id}`"
                  class="font-bold"
                  :label_class="contractRelation.suppressed ? 'text-red-500' : 'text-green-600'"
                  @click="updateSuppression($event)"
                  :label="showSuppressed(suppressed)"
  ></checkbox-field>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    contractRelation: {
      type: Object,
      required: true
    },
    shiftClickList: {
      type: Array,
      required: true
    },
    shiftClickIndex: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      savedShiftClickIndex: 'getBulkUpdateSuppressionsShiftClickIndex'
    }),
    suppressed () {
      return this.contractRelation.suppressed
    }
  },
  methods: {
    ...mapMutations({
      addToSelected: 'ADD_SUPPRESSION_TO_BULK_UPDATE',
      setSavedShiftClickIndex: 'SET_BULK_UPDATE_SUPPRESSIONS_SHIFT_CLICK_INDEX'
    }),
    ...mapActions({
      updateContractRelation: 'updateContractRelation',
      bulkUpdateSuppressions: 'bulkUpdateSuppressions'
    }),
    updateSuppression (event) {
      document.getSelection().removeAllRanges() // Prevents highlighting text for shift click functionality

      const savedShiftClickIndex = this.savedShiftClickIndex
      this.setSavedShiftClickIndex(this.shiftClickIndex)

      const toggleFunction = this.addToSelected

      if (savedShiftClickIndex === null || this.shiftClickIndex === savedShiftClickIndex || !event.shiftKey) {
        this.updateSuppressionStatus()
        return
      }

      const subset = this.shiftClickList.slice(
        Math.min(this.shiftClickIndex, savedShiftClickIndex),
        Math.max(this.shiftClickIndex, savedShiftClickIndex) + 1
      )

      subset.forEach(c => {
        toggleFunction(c)
      })

      this.bulkUpdateSuppressions(!this.suppressed)
    },
    updateSuppressionStatus () {
      if (this.contractRelation) {
        this.updateContractRelation({
          id: this.contractRelation.id,
          buyer_contract: this.contractRelation.buyer_contract,
          partner_contract: this.contractRelation.partner_contract,
          suppressed: !this.suppressed
        }).catch(error => { this.error = error })
      }
    },
    showSuppressed (status) {
      return status === true ? 'Suppressed' : 'Active'
    }
  }
}
</script>
