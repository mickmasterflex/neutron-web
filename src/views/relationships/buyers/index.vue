<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">All Buyer Contracts</h1>
      <div>
        <stat-card :data="buyer_count" :title="`Buyer Contracts`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">All Buyers</h3>
    <buyer-list :contracts="buyers"></buyer-list>
  </div>
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
