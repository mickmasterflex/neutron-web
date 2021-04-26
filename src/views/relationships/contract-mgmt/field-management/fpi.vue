<template>
 <div>
   <router-link :to="{ name: 'BuyerContractFieldManagement', params: $route.params }">Field Management</router-link>
   <fpi-panel-template></fpi-panel-template>
 </div>
</template>

<script>
import { mapActions } from 'vuex'
import fpiPanelTemplate from '@/components/forms/fpi/panel-template'

export default {
  props: {
    id: Number
  },
  methods: {
    ...mapActions({
      fetchFpi: 'fetchCurrentFpi'
    })
  },
  created () {
    this.fetchFpi(this.id)
  },
  components: {
    'fpi-panel-template': fpiPanelTemplate
  }
}
</script>
