<template>
  <content-layout>
    <template v-slot:hud-content>
      <hud-h1 :loading="loading" :content="contract.name"/>
      <hud-stat-cards>
        <stat-card v-if="contract.parent" :data="contract.parent" title="Parent" key="parentId" :loading="loading"/>
        <status-card :status="contract.status" key="statusCard" :loading="loading"/>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'details'">
          <router-link :to="{name: 'BuyerContract', params: {id:id, client: client}}">Buyer Details</router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'contracts'">
          <router-link :to="{name: 'BuyerContractContracts', params: {id:id, client: client}}">Contracts <number-label :number="contract.children ? contract.children.length : 0"/></router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'offers'">
          <router-link :to="{name: 'BuyerContractOffers', params: {id:id, client: client}}">Offers <number-label :number="contract.offer_contracts ? contract.offer_contracts.length : 0"/></router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'field-management'">
          <router-link :to="{name: 'BuyerContractFieldManagement', params: {id:id, client: client}}">Form Fields</router-link>
        </underscore-tab>
      </underscore-tabs>
    </template>
    <template v-slot:content>
      <router-view/>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { buyerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/buyer'
import statusCard from '@/components/ui/cards/stat-cards/status.vue'

export default {
  components: {
    'status-card': statusCard
  },
  props: {
    contracts: Array,
    id: Number,
    client: String
  },
  mixins: [buyerContractBreadcrumbs],
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyer',
      loading: 'getBuyerFetchLoading'
    }),
    parent () {
      return this.contract.parent
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentBuyer: 'fetchCurrentBuyer'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_BUYER',
      resetCurrentFpi: 'RESET_CURRENT_FPI',
      resetBulkUpdateBuyers: 'RESET_BULK_UPDATE_BUYERS',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    async setBuyer () {
      if (this.contract.id !== this.id) {
        await this.fetchCurrentBuyer(this.id)
      }
    },
    setBuyerWithTitleAndBreadcrumbs () {
      this.setBuyer().then(() => {
        let title = this.contract.name
        if (this.$route.meta.title) {
          title = title + ' | ' + this.$route.meta.title
        }
        document.title = title
        this.setBreadcrumbsWithAncestors()
      })
    }
  },
  watch: {
    id () {
      this.setBuyerWithTitleAndBreadcrumbs()
    },
    parent () {
      this.setBreadcrumbsWithAncestors()
    }
  },
  created () {
    this.setBuyerWithTitleAndBreadcrumbs()
  },
  destroyed () {
    this.resetCurrent()
    this.resetCurrentFpi()
    this.resetBulkUpdateBuyers()
  }
}
</script>
