<template>
  <base-panel-grid>
    <buyer-list-panel class="col-span-2"
                      :contracts="children"
                      :client="$route.params.client"
                      emptyStateCopy="Use the 'New Buyer' button to add buyers to this buyer."
                      :createBuyerDisabled="createBuyerDisabled"
    ></buyer-list-panel>
    <contract-relations-index v-if="buyer.id"
                              :contract="buyer.id"
                              contractType="buyer"
                              class="col-span-2"
    ></contract-relations-index>
    <caps-modal/>
    <create-buyer-contract v-if="!createBuyerDisabled" :client="buyer.client" :parent="buyer.id"></create-buyer-contract>
  </base-panel-grid>
</template>

<script>
import buyerList from '@/components/buyers/list-panel'
import capsModal from '@/components/caps/modal/modal'
import createBuyer from '@/components/buyers/create'
import contractRelationsIndex from '@/components/contract-relations/index'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'buyer-list-panel': buyerList,
    'caps-modal': capsModal,
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
    },
    createBuyerDisabled () {
      return !this.buyer.client
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
