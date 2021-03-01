<template>
  <div>
    <action-heading>
      <template v-slot:left>
        <h2 class="h3">All Buyer Groups</h2>
      </template>
      <template v-slot:right>
        <create-group></create-group>
      </template>
    </action-heading>
    <list-groups></list-groups>
    <update-group></update-group>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import listGroups from '@/components/buyer-groups/list'
import createGroup from '@/components/buyer-groups/create'
import updateGroup from '@/components/buyer-groups/update'

export default {
  methods: {
    ...mapActions({
      fetchBuyers: 'fetchBuyers',
      fetchBuyerGroups: 'fetchBuyerGroups',
      fetchClients: 'fetchClients'
    }),
    ...mapGetters({
      clients: 'getAllClients'
    }),
    ...mapMutations({
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchBuyerGroups()
    this.fetchBuyers()
    if (this.clients.length === 0) {
      this.fetchClients()
    }
  },
  components: {
    'list-groups': listGroups,
    'create-group': createGroup,
    'update-group': updateGroup
  }
}
</script>
