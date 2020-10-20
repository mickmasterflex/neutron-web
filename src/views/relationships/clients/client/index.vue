<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{client.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="partners.length" :title="`Partner Contracts`" :color="`teal`"></stat-card>
        <stat-card :data="buyers.length" :title="`Buyer Contracts`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'Client', params: {slug:slug}}">Client Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="{name: 'ClientContracts', params: {slug:slug}}">Contracts</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view/>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    slug: String,
    contentTab: {
      type: String,
      default: 'details'
    }
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient',
      getParentlessPartnersByClient: 'getParentlessPartnersByClient',
      getParentlessBuyersByClient: 'getParentlessBuyersByClient'
    }),
    partners: function () {
      return this.getParentlessPartnersByClient(this.client.id)
    },
    buyers: function () {
      return this.getParentlessBuyersByClient(this.client.id)
    }
  },
  methods: {
    ...mapActions({
      fetchPartners: 'fetchPartners',
      fetchBuyers: 'fetchBuyers',
      fetchCurrentClient: 'fetchCurrentClient'
    })
  },
  created () {
    this.fetchCurrentClient(this.slug)
    this.fetchPartners()
    this.fetchBuyers()
  }
}
</script>
