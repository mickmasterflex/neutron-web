<template>
  <content-layout v-if="offer">
    <template v-slot:hud>
      <h1 class="h1 text-white">{{offer.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="offer.id" :title="`Offer`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'OfferDetails', params: {id:id, client: client, buyer:buyer}}">Offer Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'field-management' ? 'active' : ''" >
          <router-link :to="{name: 'OfferFieldManagement', params: {id:id, client: client, buyer:buyer}}">Field Management</router-link>
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
    id: {
      type: Number
    },
    client: String,
    buyer: Number
  },
  computed: {
    ...mapGetters({
      offer: 'getCurrentOffer'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentOffer: 'fetchCurrentOffer'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_OFFER',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    async setOffer () {
      if (this.offer.id !== this.id) {
        await this.fetchCurrentOffer(this.id)
      }
    },
    setOfferBreadcrumbsAndTitle () {
      document.title = this.offer.name
      this.setBreadcrumbs([
        { name: 'Clients', text: 'Clients' },
        { name: 'Client', text: this.$route.params.client, params: { slug: this.$route.params.client } },
        { name: 'ClientContracts', text: 'Contracts', params: { slug: this.$route.params.client } },
        { name: 'BuyerContract', text: this.$route.params.buyer, params: { client: this.$route.params.client, id: this.$route.params.buyer } },
        { name: 'BuyerContractOffers', text: 'Offers', params: { client: this.$route.params.client, id: this.$route.params.buyer } },
        { name: 'OfferDetails', text: this.offer.name, params: { client: this.$route.params.client, buyer: this.$route.params.buyer, id: this.id } }
      ])
    }
  },
  created () {
    this.setOffer().then(() => {
      this.setOfferBreadcrumbsAndTitle()
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
