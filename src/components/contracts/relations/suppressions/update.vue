<template>
  <checkbox-field :value="contractRelation.suppressed"
                  :field_id="`suppressed-${contractRelation.id}`"
                  class="font-bold"
                  :label_class="contractRelation.suppressed ? 'text-red-500' : 'text-green-600'"
                  @click="shiftClick($event, savedShiftClickIndex, shiftClickIndex, shiftClickList, setSavedShiftClickIndex, addToSelected, updateSuppressionStatus)"
                  :label="showSuppressed(suppressed)"
  ></checkbox-field>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { shiftClick } from '@/mixins/shift-click'

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
  mixins: [shiftClick],
  methods: {
    ...mapMutations({
      addToSelected: 'ADD_SUPPRESSION_TO_BULK_UPDATE',
      setSavedShiftClickIndex: 'SET_BULK_UPDATE_SUPPRESSIONS_SHIFT_CLICK_INDEX'
    }),
    ...mapActions({
      updateContractRelation: 'updateContractRelation',
      bulkUpdateSuppressions: 'bulkUpdateSuppressions'
    }),
    afterShiftClick () {
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
