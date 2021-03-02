<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{buyer.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card v-if="buyer.parent" :data="buyer.parent" title="Parent"></stat-card>
      </div>
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

export default {
  props: {
    id: Number,
    client: String
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
      if (this.buyer.id !== this.id) {
        await this.fetchCurrentBuyer(this.id)
      }
    },
    setBuyerBreadcrumbsAndTitle () {
      document.title = this.buyer.name
      const breadcrumbs = [
        { name: 'Clients', text: 'Clients' },
        { name: 'Client', text: this.buyer.client.name, params: { slug: this.$route.params.client } }
        // { name: 'ClientContracts', text: 'Contracts', params: { slug: this.$route.params.client } }
      ]
      this.buyer.ancestors.forEach(ancestor => {
        const additionalCrumbs = [
          { name: 'BuyerContract', text: ancestor.name, params: { client: this.$route.params.client, id: ancestor.id } }
          // { name: 'BuyerContractChildren', text: 'Contracts', params: { client: this.$route.params.client, id: ancestor.id } }
        ]
        breadcrumbs.push(...additionalCrumbs)
      })
      breadcrumbs.push({ name: 'BuyerContract', text: this.buyer.name, params: { client: this.$route.params.client, id: this.$route.params.id } })
      this.setBreadcrumbs(breadcrumbs)
    }
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  watch: {
    id () {
      this.setBuyer().then(() => {
        this.setBuyerBreadcrumbsAndTitle()
      })
    }
  },
  created () {
    this.setBuyer().then(() => {
      this.setBuyerBreadcrumbsAndTitle()
    })
  },
  destroyed () {
    this.resetCurrent()
    this.resetBulkUpdateBuyers()
  }
}
</script>
