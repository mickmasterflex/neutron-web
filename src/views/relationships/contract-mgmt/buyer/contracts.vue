<template>
  <base-panel-grid>
    <buyer-list-panel class="col-span-2"
                      :contracts="children"
                      :client="$route.params.client"
                      emptyStateCopy="Use the 'New Buyer' button to add buyers to this buyer."></buyer-list-panel>
    <contract-relations-index v-if="buyer.id"
                              :contract="buyer.id"
                              contractType="buyer"
                              class="col-span-2"></contract-relations-index>
    <create-buyer-contract :client="buyer.client.id" :parent="buyer.id"></create-buyer-contract>
  </base-panel-grid>
</template>

<script>
import buyerList from '@/components/buyers/list-panel'
import createBuyer from '@/components/buyers/create'
import contractRelationsIndex from '@/components/contract-relations/index'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'buyer-list-panel': buyerList,
    'create-buyer-contract': createBuyer,
    'contract-relations-index': contractRelationsIndex
  },
  computed: {
    ...mapGetters({
      buyer: 'getCurrentBuyer',
      buyers: 'getAllBuyers',
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
    if (!this.buyers.length) {
      this.fetchBuyers()
    }
  }
}
</script>
