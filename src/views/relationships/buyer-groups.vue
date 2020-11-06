<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">Buyer Groups</h1>
      <div class="hud--stat-cards"></div>
    </template>
    <template v-slot:content>
      <action-heading>
        <template v-slot:right>
          <create-group></create-group>
        </template>
      </action-heading>
      <list-groups></list-groups>
      <update-group></update-group>
    </template>
  </content-layout>
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
