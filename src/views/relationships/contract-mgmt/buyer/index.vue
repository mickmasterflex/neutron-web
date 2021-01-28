<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="h1 text-white">{{buyer.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card v-if="buyer.parent" :data="buyer.parent" :title="`Parent`" :color="`teal`"></stat-card>
        <stat-card :data="buyer.client" :title="`Client`" :color="`teal`"></stat-card>
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
      resetBulkUpdateBuyers: 'RESET_BULK_UPDATE_BUYERS'
    }),
    async setBuyer () {
      if (this.buyer.id !== this.id) {
        await this.fetchCurrentBuyer(this.id)
      }
    }
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  watch: {
    id: function () {
      this.fetchCurrentBuyer(this.id)
    }
  },
  created () {
    this.setBuyer().then(() => {
      document.title = this.buyer.name
    })
  },
  destroyed () {
    this.resetCurrent()
    this.resetBulkUpdateBuyers()
  }
}
</script>
