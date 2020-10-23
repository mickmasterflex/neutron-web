<template>
  <div>
    <input v-model="contractRelation.suppressed"
           type="checkbox"
           :id="`suppressed-${contractRelation.id}`"
           @change="updateSuppressionStatus(contractRelation, contractRelation.suppressed)"
           class="mr-1"
    >
    <span :class="contractRelation.suppressed ? 'text-red-500' : 'text-green-600'" class="font-bold">
      {{ showSuppressed(contractRelation.suppressed) }}
    </span>
  </div>
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
