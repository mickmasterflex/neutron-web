<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">{{ contract.name }}</h1>
      <hud-stat-cards>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsContractContracts', params: { clientId: clientId, id: id }}">Contracts</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'offers' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsContractOffers', params: { clientId: clientId, id: id }}">Offers</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsContractLeads', params: { clientId: clientId, id: id }}">Leads</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyerStatsContract'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerClientsStats: 'fetchBuyerClientsStats'
    })
  },
  created () {
    this.fetchBuyerClientsStats()
  }
}
</script>
