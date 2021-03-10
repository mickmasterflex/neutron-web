<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="h1 text-white">{{contract.name}}</h1>
      <hud-stat-cards>
        <stat-card v-if="contract.parent" :data="contract.parent" title="Parent" key="parentId"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'BuyerContract', params: {id:id, client: client}}">Buyer Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="{name: 'BuyerContractChildren', params: {id:id, client: client}}">Contracts</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'offers' ? 'active' : ''">
          <router-link :to="{name: 'BuyerContractOffers', params: {id:id, client: client}}">Offers</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'field-management' ? 'active' : ''" >
          <router-link :to="{name: 'BuyerContractFieldManagement', params: {id:id, client: client}}">Field Management</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view/>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { buyerContractBreadcrumbs } from '@/mixins/breadcrumbs/relationships/buyer'

export default {
  props: {
    id: Number,
    client: String
  },
  mixins: [buyerContractBreadcrumbs],
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyer'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentBuyer: 'fetchCurrentBuyer'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_BUYER',
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
        document.title = this.contract.name
        this.setBreadcrumbsWithAncestors()
      })
    }
  },
  watch: {
    id () {
      this.setBuyerWithTitleAndBreadcrumbs()
    }
  },
  created () {
    this.setBuyerWithTitleAndBreadcrumbs()
  },
  destroyed () {
    this.resetCurrent()
    this.resetBulkUpdateBuyers()
  }
}
</script>
