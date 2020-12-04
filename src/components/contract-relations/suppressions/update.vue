<template>
  <checkbox-field v-model="contractRelation.suppressed"
                  :field_id="`suppressed-${contractRelation.id}`"
                  class="font-bold"
                  :label_class="contractRelation.suppressed ? 'text-red-500' : 'text-green-600'"
                  @input="updateSuppressionStatus(contractRelation, contractRelation.suppressed)">{{ showSuppressed(contractRelation.suppressed) }}</checkbox-field>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      updateContractRelation: 'updateContractRelation'
    }),
    updateSuppressionStatus (relation, status) {
      if (relation) {
        this.updateContractRelation({
          id: relation.id,
          buyer_contract: relation.buyer_contract,
          partner_contract: relation.partner_contract,
          suppressed: status
        }).catch(error => { this.error = error })
      }
    },
    showSuppressed (status) {
      return status === true ? 'Suppressed' : 'Active'
    }
  },
  props: {
    contractRelation: {
      type: Object,
      required: true
    }
  }
}
</script>
