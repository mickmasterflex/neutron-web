<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">Buyer Groups</h1>
      <div class="hud--stat-cards"></div>
    </template>
    <template v-slot:content>
      <list-groups></list-groups>
    </template>
  </content-layout>
</template>

<script>
import { mapActions } from 'vuex'
import listGroups from '@/components/buyer-groups/list'

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
    'list-groups': listGroups
  }
}
</script>
