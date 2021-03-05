<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{partner.name}}</h1>
      <hud-stat-cards>
        <stat-card v-if="partner.parent" :data="partner.parent" title="Parent" key="parentId"></stat-card>
        <stat-card v-if="partner.campaigns" :data="partner.campaigns.length" title="Campaigns" key="campaignCount"></stat-card>
      </hud-stat-cards>
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
import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/partner'

export default {
  props: {
    id: Number
  },
  mixins: [partnerContractBreadcrumbs],
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
      resetCurrent: 'RESET_CURRENT_PARTNER'
    }),
    async setPartner () {
      if (this.partner.id !== this.id) {
        await this.fetchCurrentPartner(this.id)
      }
    },
    setPartnerWithTitleAndBreadcrumbs () {
      this.setPartner().then(() => {
        document.title = this.partner.name
        this.setBreadcrumbsWithAncestors()
      })
    }
  },
  watch: {
    id () {
      this.setPartnerWithTitleAndBreadcrumbs()
    }
  },
  created () {
    this.setPartnerWithTitleAndBreadcrumbs()
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
