<template>
  <span>
    {{contractType}}:
    <router-link class="text-link" :to="fieldManagementRoute">
      {{actualContract.name}}
    </router-link>
  </span>
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
    fieldManagementRoute () {
      if (this.contractType === 'Buyer') {
        return { name: 'BuyerContractFields', params: { id: this.actualContract.id, client: this.clientData.slug } }
      } else if (this.contractType === 'Offer') {
        return { name: 'OfferFieldManagement', params: { id: this.actualContract.id, buyer: this.actualContract.parent, client: this.clientData.slug } }
      }
      return {}
    },
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
    })
  }
}
</script>
