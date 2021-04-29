<template>
  <content-layout>
    <template v-slot:hud-content>
      <hud-h1 :loading="loading" :content="client.name"/>
    </template>
    <template v-slot:contentTabs>
      <underscore-tabs>
        <underscore-tab :active="$route.meta.contentTab === 'details'">
          <router-link :to="{name: 'Client', params: {slug: slug}}">Client Details</router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'buyers'">
          <router-link :to="{name: 'ClientBuyerContracts', params: {slug: slug}}">Buyers <number-label :number="buyers.length"/></router-link>
        </underscore-tab>
        <underscore-tab :active="$route.meta.contentTab === 'partners'">
          <router-link :to="{name: 'ClientPartnerContracts', params: {slug: slug}}">Partners <number-label :number="partners.length"/></router-link>
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
      buyersByClient: 'getParentlessBuyersByClient',
      partnersByClient: 'getParentlessPartnersByClient',
      loading: 'getClientFetchLoading'
    }),
    buyers () {
      return this.buyersByClient(this.client.id)
    },
    partners () {
      return this.partnersByClient(this.client.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentClient: 'fetchCurrentClient'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_CLIENT',
      resetBulkUpdateBuyers: 'RESET_BULK_UPDATE_BUYERS',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    async setClient () {
      if (this.client.slug !== this.slug) {
        await this.fetchCurrentClient(this.slug)
      }
    },
    setClientBreadcrumbsAndTitle () {
      document.title = this.client.name
      this.setBreadcrumbs([
        { name: 'Clients', text: 'Clients' },
        { name: 'Client', text: this.client.name, params: { slug: this.$route.params.slug } }
      ])
    }
  },
  created () {
    this.setClient().then(() => {
      this.setClientBreadcrumbsAndTitle()
    })
  },
  destroyed () {
    this.resetCurrent()
    this.resetBulkUpdateBuyers()
  }
}
</script>
