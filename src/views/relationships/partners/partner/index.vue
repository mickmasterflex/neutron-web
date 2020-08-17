<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">{{partner.name}}</h1>
        <div class="hud--stat-cards">
          <stat-card v-if="partner.parent" :data="partner.parent" :title="`Parent`" :color="`teal`"></stat-card>
          <stat-card :data="partner.client" :title="`Client`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'PartnerContract', params: {id:id}}">Partner Details</router-link>
        </li>
        <li class="underscore-tab" :class="$route.meta.contentTab === 'campaigns' ? 'active' : ''">
          <router-link :to="{name: 'PartnerContractCampaigns', params: {id:id}}">Campaigns</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view />
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      partner: 'getCurrentPartner'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentPartner: 'fetchCurrentPartner',
      fetchCampaigns: 'fetchCampaigns'
    })
  },
  created () {
    this.fetchCurrentPartner(this.id)
    this.fetchCampaigns()
  }
}
</script>
