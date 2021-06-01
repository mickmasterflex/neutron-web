<template>
  <span @click="linkToUsedContracts()" class="text-link">{{contractType}}:{{actualContract.name}}</span>
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
      baseField: 'getBaseFieldById',
      clientData: 'getCurrentClientData'
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
    linkToUsedContracts () {
      if (this.contractType === 'Buyer') {
        this.$router.push({
          name: 'BuyerContract',
          params: { id: this.actualContract.id, client: this.clientData.slug }
        })
      } else if (this.contractType === 'Offer') {
        this.$router.push({
          name: 'OfferDetails',
          params: { id: this.actualContract.id, buyer: this.actualContract.parent, client: this.clientData.slug }
        })
      }
    }
  }
}
</script>
