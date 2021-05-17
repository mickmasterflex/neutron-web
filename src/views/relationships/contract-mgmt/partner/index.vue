<template>
  <content-layout>
    <template v-slot:hud-content>
      <hud-h1 :loading="loading" :content="contract.name"/>
      <hud-stat-cards>
        <stat-card v-if="contract.parent" :data="contract.parent" title="Parent" key="parentId"></stat-card>
        <status-card :status="contract.status" key="statusCard" :loading="loading"/>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'details'">
          <router-link :to="{name: 'PartnerContract', params: {id:id}}">Partner Details</router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'contracts'">
          <router-link :to="{name: 'PartnerContractContracts', params: {id:id}}">Contracts <number-label :number="contract.children ? contract.children.length : 0"/></router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'campaigns'">
          <router-link :to="{name: 'PartnerContractCampaigns', params: {id:id}}">Campaigns <number-label :number="contract.campaigns ? contract.campaigns.length : 0"/></router-link>
        </underscore-tab>
      </underscore-tabs>
    </template>
    <template v-slot:content>
      <router-view />
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { partnerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/partner'
import statusCard from '@/components/ui/cards/stat-cards/status.vue'

export default {
  components: {
    'status-card': statusCard
  },
  props: {
    id: Number
  },
  mixins: [partnerContractBreadcrumbs],
  computed: {
    ...mapGetters({
      contract: 'getCurrentPartner',
      loading: 'getPartnerFetchLoading'
    }),
    parent () {
      return this.contract.parent
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentPartner: 'fetchCurrentPartner'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_PARTNER',
      resetCurrentAlternateIds: 'RESET_CURRENT_ALTERNATE_IDS'
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
    },
    parent () {
      this.setBreadcrumbsWithAncestors()
    }
  },
  created () {
    this.setPartnerWithTitleAndBreadcrumbs()
  },
  destroyed () {
    this.resetCurrent()
    this.resetCurrentAlternateIds()
  }
}
</script>
