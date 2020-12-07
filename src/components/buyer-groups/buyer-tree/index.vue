<template>
  <div class="table table-white table-border-none w-auto">
    <ul class="flex flex-row">
      <li class="w-32 th">Type</li>
      <li class="w-16 th">Id</li>
      <li class="w-64 th">Name</li>
      <li class="w-32 th">Status</li>
      <li class="w-24 th">Contracts</li>
    </ul>
    <buyer-tree-node v-for="client in allClients" :key="client.id" :obj="client" type="client"></buyer-tree-node>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import buyerTreeNode from '@/components/buyer-groups/buyer-tree/node'

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
    'buyer-tree-node': buyerTreeNode
  }
}
</script>
