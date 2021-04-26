<template>
 <div>
   <router-link :to="{ name: 'BuyerContractFieldManagement', params: $route.params }">Field Management</router-link>
 </div>
</template>

<script>
import { mapActions } from 'vuex'

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
  }
}
</script>
