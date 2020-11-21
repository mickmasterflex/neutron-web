<template>
  <div class="table table-white table-border-none w-auto">
    <ul class="flex flex-row">
      <li class="w-32 th">Type</li>
      <li class="w-64 th">Name</li>
      <li class="w-32 th">Status</li>
    </ul>
    <tr-parent v-for="client in allClients" :key="client.id" :obj="client" type="client"></tr-parent>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import parentRow from '@/components/buyer-groups/table/tr/parent'

export default {
  computed: {
    ...mapGetters({
      allClients: 'getAllClients',
      allBuyers: 'getAllBuyers'
    })
  },
  methods: {
    ...mapActions({
      fetchClients: 'fetchClients',
      fetchBuyers: 'fetchBuyers'
    })
  },
  mounted () {
    this.fetchClients()
    this.fetchBuyers()
  },
  components: {
    'tr-parent': parentRow
  }
}
</script>
