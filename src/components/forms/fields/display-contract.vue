<template>
  <span @click="linkToUsedContracts()" class="text-link">{{contractType}}: {{actualContract.name}}</span>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    contract: Object
  },
  computed: {
    ...mapGetters({
      usedBaseFields: 'getUsedBaseFields',
      usedBaseOptionFieldTypes: 'getBaseOptionFieldTypes',
      usedBaseFieldFormsByUsedField: 'getUsedBaseFieldFormsByUsedField',
      baseField: 'getBaseFieldById'
    }),
    contractType () {
      if (this.contract.buyer_contract) {
        return 'Buyer'
      } else if (this.contract.offer_contract) {
        return 'Offer'
      } return ''
    },
    actualContract () {
      if (this.contractType === 'Buyer') {
        return this.contract.buyer_contract
      } else if (this.contractType === 'Offer') {
        return this.contract.offer_contract
      }
      return 'None Assigned'
    }
  },
  methods: {
    ...mapMutations({
      setUsedBaseFieldS: 'SET_USED_BASE_FIELD'
    }),
    linkToUsedContracts (contract) {
      if (this.actualContract === contract.actualContract.name) {
        this.$router.push({
          name: '',
          params: { id: contract.id }
        })
        // } else {
        //   this.
        //   this.$router.push({
        //     name: '',
        //     params: { id: contract.id }
        //   })
      }
    }
  }
}
</script>
