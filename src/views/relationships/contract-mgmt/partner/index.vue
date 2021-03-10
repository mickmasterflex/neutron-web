<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="h1 text-white">{{contract.name}}</h1>
      <hud-stat-cards>
        <stat-card v-if="contract.parent" :data="contract.parent" title="Parent" key="parentId"></stat-card>
        <stat-card v-if="contract.campaigns" :data="contract.campaigns.length" title="Campaigns" key="campaignCount"></stat-card>
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
      contract: 'getCurrentPartner'
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
      if (this.contract.id !== this.id) {
        await this.fetchCurrentPartner(this.id)
      }
    },
    setPartnerWithTitleAndBreadcrumbs () {
      this.setPartner().then(() => {
        document.title = this.contract.name
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
