<template>
  <div>
    <div v-if="allClients.length > 0 && allBuyers.length > 0">
      <ul class="flex flex-row font-normal p-3 rounded-t-lg border-2 border-gray-200 border-b-0 bg-gray-900 text-left text-white">
        <li class="w-64 px-3">Name</li>
        <li class="w-10 px-3">Id</li>
        <li class="w-24 px-3">Status</li>
        <li class="w-20 px-3">Buyers</li>
      </ul>
      <div class="bg-white p-2 rounded-b-lg border-2 border-t-0 border-gray-200 relative" :class="{'cursor-wait': loading}">
        <transition enter-active-class="animate__animated animate__fadeIn animate__faster" leave-active-class="animate__animated animate__fadeOut animate__faster">
          <div v-show="loading" class="absolute inset-0 flex flex-row items-center justify-center bg-white bg-opacity-75 z-50"></div>
        </transition>
        <buyer-tree-node
          v-for="client in allClients"
          :key="client.id"
          :obj="client"
          type="client"></buyer-tree-node>
      </div>
    </div>
    <table-empty-state v-else heading="No clients or buyers have been created" copy="Close the modal and hit the Clients tab to get started." class="well"></table-empty-state>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import buyerTreeNode from '@/components/buyer-groups/buyer-tree/node'

export default {
  computed: {
    ...mapGetters({
      allClients: 'getAllClients',
      allBuyers: 'getAllBuyers',
      loading: 'getBuyerGroupsLoading'
    })
  },
  components: {
    'buyer-tree-node': buyerTreeNode
  }
}
</script>
