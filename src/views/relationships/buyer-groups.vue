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
import { mapActions } from 'vuex'
import listGroups from '@/components/buyer-groups/list'
import createGroup from '@/components/buyer-groups/create'
import updateGroup from '@/components/buyer-groups/update'

export default {
  methods: {
    ...mapActions({
      fetchBuyerGroups: 'fetchBuyerGroups'
    })
  },
  created () {
    this.fetchBuyerGroups()
  },
  components: {
    'list-groups': listGroups,
    'create-group': createGroup,
    'update-group': updateGroup
  }
}
</script>
