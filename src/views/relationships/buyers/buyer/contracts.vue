<template>
  <div>
    <action-heading>
      <template v-slot:left>
        <h2 class="h3">Child Contracts</h2>
      </template>
      <template v-slot:right>
        <button class="btn btn-turquoise" @click="showCreateBuyerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Buyer</button>
      </template>
    </action-heading>
    <buyer-list :contracts="children" :client="$route.params.client"></buyer-list>
    <create-buyer-contract :client="client.id" :buyer-contracts="buyers" :parent="buyer.id"></create-buyer-contract>
  </div>
</template>

<script>
import buyerList from '@/components/buyers/list'
import createBuyer from '@/components/buyers/create'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'buyer-list': buyerList,
    'create-buyer-contract': createBuyer
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      buyers: 'getAllBuyers',
      client: 'getCurrentClient',
      getBuyersByParent: 'getBuyersByParent'
    }),
    children: function () {
      return this.getBuyersByParent(this.buyer.id)
    }
  },
  methods: {
    ...mapActions({
      fetchBuyers: 'fetchBuyers'
    }),
    ...mapMutations({
      showCreateBuyerModal: 'SHOW_CREATE_BUYER_MODAL'
    })
  },
  created () {
    this.fetchBuyers()
  }
}
</script>
