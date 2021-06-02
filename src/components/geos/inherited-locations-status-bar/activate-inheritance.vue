<template>
  <button
    @click="updateContractAndFetchInherited()"
    class="btn btn-red border-white btn-sm"
    :disabled="loading">
      <span v-if="loading">
        <font-awesome-icon icon="spinner" pulse></font-awesome-icon> Loading
      </span>
      <span v-else>Activate Inheritance</span>
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      offer: 'getCurrentOffer',
      currentGeo: 'getCurrentGeo',
      currentGeoContractType: 'getCurrentGeoContractType'
    }),
    contract () {
      switch (this.currentGeoContractType) {
        case 'buyer':
          return this.buyer
        case 'offer':
          return this.offer
        default:
          return {}
      }
    }
  },
  methods: {
    ...mapActions({
      updateOffer: 'updateOffer',
      updateBuyer: 'updateBuyer',
      fetchInheritedLocationContracts: 'fetchInheritedLocationContracts'
    }),
    updateContractAndFetchInherited () {
      this.loading = true
      this.updateContract().then(() => {
        this.fetchInheritedLocationContracts(this.currentGeo).then(() => {
          this.loading = false
        })
      })
    },
    async updateContract () {
      const updatedContract = { ...this.contract }
      updatedContract.toggle_geo_inheritance = true
      switch (this.currentGeoContractType) {
        case 'buyer':
          await this.updateBuyer(updatedContract)
          break
        case 'offer':
          await this.updateOffer(updatedContract)
          break
        default:
          throw new Error('current_geo_contract_type is not set')
      }
    }
  }
}
</script>
