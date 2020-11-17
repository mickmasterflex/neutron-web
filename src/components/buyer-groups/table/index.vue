<template>
  <div class="table table-white table-border-none w-auto">
    <ul class="flex flex-row">
      <li class="w-32 th">Type</li>
      <li class="w-64 th">Name</li>
      <li class="w-32 th">Status</li>
    </ul>
    <tr-parent v-for="client in allClients" :key="client.id" :client="client"></tr-parent>
<!--    <tr-buyer v-for="buyer in allBuyers" :key="'buyer' + buyer.id" :buyer="buyer"></tr-buyer>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import parentRow from '@/components/buyer-groups/table/tr/parent'
// import buyerRow from '@/components/buyer-groups/table/tr/buyer'

export default {
  computed: {
    ...mapGetters({
      // allClients: 'getCurrentBuyerGroupTree'
      allClients: 'getAllClients',
      allBuyers: 'getAllBuyers'
    })
  },
  methods: {
    ...mapActions({
      fetchClients: 'fetchClients',
      fetchBuyers: 'fetchBuyers'
      // fetchParentNode: 'fetchParentNode'
    })
  },
  mounted () {
    this.fetchClients()
    this.fetchBuyers()
    // this.fetchParentNode()
  },
  components: {
    // 'tr-buyer': buyerRow,
    'tr-parent': parentRow
  }
}
</script>
