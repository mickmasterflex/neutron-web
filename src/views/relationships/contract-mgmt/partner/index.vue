<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{partner.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card v-if="partner.parent" :data="partner.parent" title="Parent"></stat-card>
        <stat-card :data="partner.campaigns.length" title="Campaigns"></stat-card>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'PartnerContract', params: {id:id}}">Partner Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="{name: 'PartnerContractChildren', params: {id:id}}">Contracts</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'campaigns' ? 'active' : ''">
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
      fetchCurrentPartner: 'fetchCurrentPartner'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_PARTNER',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    async setPartner () {
      if (this.partner.id !== this.id) {
        await this.fetchCurrentPartner(this.id)
      }
    },
    setPartnerBreadcrumbsAndTitle () {
      document.title = this.partner.name
      this.setBreadcrumbs([
        { name: 'Clients', text: 'Clients' },
        { name: 'Client', text: this.$route.params.client, params: { slug: this.$route.params.client } },
        { name: 'ClientContracts', text: 'Contracts', params: { slug: this.$route.params.client } },
        { name: 'PartnerContract', text: this.partner.name, params: { client: this.$route.params.client, id: this.$route.params.id } }
      ])
    }
  },
  watch: {
    id () {
      this.setPartner().then(() => {
        this.setPartnerBreadcrumbsAndTitle()
      })
    }
  },
  created () {
    this.setPartner().then(() => {
      this.setPartnerBreadcrumbsAndTitle()
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
