<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="text-white text-4xl font-hairline">Overview</h1>
      <hud-stat-cards>
        <stat-card v-if="getAllClientsCount > 0" :data="getAllClientsCount" title="Clients" key="clientCount"></stat-card>
        <stat-card v-if="getBuyerGroups" :data="getBuyerGroups.length" title="Buyer Groups" key="buyerGroupCount"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'clients'">
          <router-link :to="{name: 'Clients'}">Clients</router-link>
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getAllClientsCount: 'getAllClientsCount',
      getBuyerGroups: 'getBuyerGroups'
    })
  }
}
</script>
