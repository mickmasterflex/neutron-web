<template>
  <status-bar :show="show" icon="info-circle" color="blue" enter-active-class="animate__animated animate__fadeIn">
    <template slot="content">
      Inherits locations from:
      <router-link
        class="underline mr-2"
        :key="`geoInheritedContract-${contract.contract_id}`"
        v-for="contract in inheritedLocationContracts"
        :to="{ name: 'BuyerContract', params: { id: contract.contract_id, client: currentClientData.slug } }">
        {{ contract.contract_name }}</router-link>
    </template>
  </status-bar>
</template>

<script>
import statusBar from '@/components/ui/status-bar/default'
import { mapGetters } from 'vuex'

export default {
  props: {
    show: Boolean
  },
  computed: {
    ...mapGetters({
      currentGeoContractType: 'getCurrentGeoContractType',
      inheritedLocationContracts: 'getInheritedLocationContracts',
      currentClientData: 'getCurrentClientData'
    })
  },
  components: {
    'status-bar': statusBar
  }
}
</script>
