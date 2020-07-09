<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">{{buyer.name}}</h1>
        <div class="hud--stat-cards">
          <stat-card v-if="buyer.parent" :data="buyer.parent" :title="`Parent`" :color="`teal`"></stat-card>
          <stat-card :data="buyer.client" :title="`Client`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab" :class="contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'BuyerContract', params: {id:id}}">Buyer Details</router-link>
        </li>
        <li class="underscore-tab" :class="contentTab === 'offers' ? 'active' : ''">
          <router-link :to="{name: 'BuyerContractOffers', params: {id:id}}">Offers</router-link>
        </li>
        <li class="underscore-tab" :class="contentTab === 'field-management' ? 'active' : ''" >
          <router-link :to="{name: 'BuyerContractFieldManagement', params: {id:id}}">Field Management</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <slot name="content"/>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: Number,
    contentTab: {
      type: String,
      default: 'details'
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentBuyer: 'fetchCurrentBuyer'
    })
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer'
    })
  },
  created () {
    this.fetchCurrentBuyer(this.id)
  }
}
</script>
