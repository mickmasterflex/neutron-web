<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">All Offers</h1>
        <div class="hud--stat-cards">
          <stat-card :data="offerCount" :title="`Offers`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <offer-list :offers="offers"></offer-list>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import offerList from '@/components/offers/list'

export default {
  props: {
    buyer: Number
  },
  components: {
    'offer-list': offerList
  },
  computed: {
    ...mapGetters({
      offers: 'getOffers'
    }),
    offerCount: function () {
      return this.offers.length
    }
  },
  methods: {
    ...mapActions({ fetchOffers: 'fetchOffers' })
  },
  created () {
    this.fetchOffers()
  }
}
</script>
