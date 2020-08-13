<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="h1 text-white">All Buyer Contracts</h1>
        <div class="hud--stat-cards">
          <stat-card :data="buyer_count" :title="`Buyer Contracts`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <buyer-list :contracts="buyers"></buyer-list>
    </template>
  </content-layout>
</template>

<script>
import buyersList from '@/components/buyers/list'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    'buyer-list': buyersList
  },
  computed: {
    ...mapGetters({
      buyers: 'getAllBuyers',
      buyer_count: 'getAllBuyersCount'
    })
  },
  methods: {
    ...mapActions({ fetchBuyers: 'fetchBuyers' })
  },
  created () {
    this.fetchBuyers()
  }
}
</script>
