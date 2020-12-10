<template>
  <div class="table table-border-none w-auto">
    <ul class="flex flex-row font-normal p-3 rounded-t-lg border-gray-800 bg-gray-900 text-left text-white">
      <li class="w-32 pl-12">Type</li>
      <li class="w-16">Id</li>
      <li class="w-64">Name</li>
      <li class="w-32">Status</li>
      <li class="w-32 pr-5">Contracts</li>
    </ul>
    <div class="bg-white p-2 rounded-b-lg border-2 border-gray-200">
      <buyer-tree-node
        v-for="client in allClients"
        :key="client.id"
        :obj="client"
        type="client"></buyer-tree-node>
    </div>
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
