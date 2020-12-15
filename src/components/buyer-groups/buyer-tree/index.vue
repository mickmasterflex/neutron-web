<template>
  <div class="w-full relative">
    <div v-if="allClients.length > 0 && allBuyers.length > 0">
      <ul class="flex flex-row font-normal p-3 rounded-t-lg border-2 border-gray-200 border-b-0 bg-gray-900 text-left text-white">
        <li class="w-64 px-3">Name</li>
        <li class="w-10 px-3">Id</li>
        <li class="w-24 px-3">Status</li>
        <li class="w-20 px-3">Buyers</li>
      </ul>
      <div class="bg-white p-2 rounded-b-lg border-2 border-t-0 border-gray-200" :class="{'cursor-wait': loading}">
        <div v-show="loading" class="absolute inset-0 flex flex-row items-center justify-center bg-white bg-opacity-50 z-50"></div>
        <buyer-tree-node
          v-for="client in allClients"
          :key="client.id"
          :obj="client"
          type="client"></buyer-tree-node>
      </div>
    </div>
    <table-empty-state v-else heading="Loading all clients and buyers" copy="This might take a moment..." class="well"></table-empty-state>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import buyerTreeNode from '@/components/buyer-groups/buyer-tree/node'

export default {
  computed: {
    ...mapGetters({
      allClients: 'getAllClients',
      allBuyers: 'getAllBuyers',
      loading: 'getBuyerGroupsLoading'
    })
  },
  mounted () {
    this.fetchClients()
    this.fetchBuyers()
  },
  methods: {
    ...mapActions({
      fetchClients: 'fetchClients',
      fetchBuyers: 'fetchBuyers'
    })
  },
  components: {
    'buyer-tree-node': buyerTreeNode
  }
}
</script>
