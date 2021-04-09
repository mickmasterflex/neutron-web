<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="text-white text-4xl font-hairline">Overview</h1>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'clients'">
          <router-link :to="{name: 'Clients'}">Clients <number-label :number="getAllClientsCount"/></router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'buyerGroups'">
          <router-link :to="{name: 'BuyerGroups'}">Buyer Groups</router-link>
        </underscore-tab>
      </underscore-tabs>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getAllClientsCount: 'getAllClientsCount'
    })
  },
  methods: {
    ...mapActions({
      fetchClients: 'fetchClients'
    }),
    ...mapMutations({
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.fetchClients()
    this.resetBreadcrumbs()
  }
}
</script>
