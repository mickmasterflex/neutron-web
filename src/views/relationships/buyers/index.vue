<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">All Buyer Contracts</h1>
      <div>
        <stat-card :data="count" :title="`Buyers Contracts`" :color="`teal`"></stat-card>
      </div>
    </div>
    <h3 class="h3 mt-5 mb-2">All Buyer</h3>
    <buyers-contract-list :contracts="buyers"></buyers-contract-list>
  </div>
</template>

<script>
import buyersContractList from '@/components/contracts/buyers/list'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  components: {
    'buyers-contract-list': buyersContractList
  },
  computed: {
    ...mapGetters({ buyers: 'getAllBuyers', count: 'getAllBuyersCount' })
  },
  methods: {
    ...mapActions({
      fetchBuyers: 'fetchBuyers'
    })
  },
  created () {
    this.fetchBuyers()
  }
}
</script>
