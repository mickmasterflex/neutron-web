<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="h1 text-white">{{client.name}}</h1>
      <hud-stat-cards>
        <stat-card :data="partners.length" title="Partner Contracts" key="partnerCount"></stat-card>
        <stat-card :data="buyers.length" title="Buyer Contracts" key="buyerCount"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'Client', params: {slug: slug}}">Client Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="{name: 'ClientContracts', params: {slug: slug}}">Contracts</router-link>
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
      getParentlessBuyersByClient: 'getParentlessBuyersByClient',
      allBuyers: 'getAllBuyers',
      allPartners: 'getAllPartners'
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
    if (!this.allBuyers.length) {
      this.fetchBuyers()
    }
    if (!this.allPartners.length) {
      this.fetchPartners()
    }
  },
  destroyed () {
    this.resetCurrent()
    this.resetBulkUpdateBuyers()
  }
}
</script>
