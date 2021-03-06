<template>
  <base-panel-grid>
    <table-empty-state
      class="well col-span-2"
      v-if="!buyerGroupsExist"
      :heading="emptyStateHeading"
      :copy="emptyStateCopy"></table-empty-state>
    <panel-template
      v-for="buyerGroup in buyerGroups"
      :title="buyerGroup.name"
      :subtitle="'id: ' + buyerGroup.id"
      :key="buyerGroup.id"
      :show-loader="loadingClientsBuyers"
      :loading-text="loadingBuyersText"
      class="col-span-2">
      <template v-slot:action>
        <btn-group-right>
          <delete-group :id="buyerGroup.id"></delete-group>
          <button @click="showModalSetCurrent(buyerGroup)" class="btn btn-hollow-blue btn-circle"><font-awesome-icon icon="pencil-alt"></font-awesome-icon></button>
        </btn-group-right>
      </template>
      <template v-slot:content>
        <list-buyers :buyers="getBuyersByBuyerGroup(buyerGroup.id)"></list-buyers>
      </template>
    </panel-template>
  </base-panel-grid>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import listBuyers from '@/components/buyer-groups/list-buyers'
import deleteGroup from '@/components/buyer-groups/delete'

export default {
  computed: {
    ...mapGetters({
      buyerGroups: 'getBuyerGroups',
      getBuyersByBuyerGroup: 'getBuyersByBuyerGroup',
      loadingBuyerGroups: 'getBuyerGroupsFetchLoading',
      loadingBuyers: 'getBuyersFetchLoading',
      loadingClients: 'getClientsFetchLoading',
      loadingBuyersText: 'getBuyersFetchLoadingText'
    }),
    loadingClientsBuyers () {
      return this.loadingBuyers ? this.loadingBuyers : this.loadingClients
    },
    buyerGroupsExist () {
      return this.buyerGroups ? this.buyerGroups.length > 0 : false
    },
    emptyStateHeading () {
      return this.loadingBuyerGroups ? 'Loading Buyer Groups' : 'No Buyer Groups Added'
    },
    emptyStateCopy () {
      return this.loadingBuyerGroups ? 'This may take a few seconds' : 'Use the \'New Buyer Group\' button to add buyer groups.'
    }
  },
  components: {
    'delete-group': deleteGroup,
    'list-buyers': listBuyers
  },
  methods: {
    ...mapMutations({
      showModal: 'SHOW_UPDATE_BUYER_GROUP_MODAL',
      setCurrent: 'SET_CURRENT_BUYER_GROUP'
    }),
    showModalSetCurrent (group) {
      this.showModal()
      this.setCurrent(group)
    }
  }
}
</script>
