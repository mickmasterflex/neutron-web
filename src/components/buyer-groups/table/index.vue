<template>
  <table>
    <thead>
      <th class="th">Type</th>
      <th class="th">Name</th>
      <th class="th">Status</th>
    </thead>
    <tbody class="tbody">
<!--      <tr-buyer v-for="buyer in allBuyers" :key="buyer.id" :buyer="buyer"></tr-buyer>-->
      <tr-parent v-for="client in allClients" :key="client.id" :client="client"></tr-parent>
    </tbody>
  </table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import buyerRow from '@/components/buyer-groups/table/tr/buyer'
import parentRow from '@/components/buyer-groups/table/tr/parent'

export default {
  computed: {
    ...mapGetters({
      allBuyers: 'getAllBuyers',
      allClients: 'getAllBuyers'
    })
  },
  methods: {
    ...mapActions({
      fetchClients: 'fetchClients',
      fetchBuyers: 'fetchBuyers'
    })
  },
  created () {
    this.fetchClients()
    this.fetchBuyers()
  },
  components: {
    // 'tr-buyer': buyerRow,
    'tr-parent': parentRow
  }
}
</script>
