<template>
  <panel-template
    title="Buyer Contracts"
    :showLoader="buyersLoading"
    :loading-text="buyersLoadingText">
    <template v-slot:action>
      <button class="btn btn-turquoise" @click="showCreateBuyerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Buyer</button>
    </template>
    <template v-slot:content>
      <buyer-list v-bind="$attrs"></buyer-list>
    </template>
  </panel-template>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import buyerList from '@/components/buyers/list'

export default {
  components: {
    'buyer-list': buyerList
  },
  computed: {
    ...mapGetters({
      buyersLoading: 'getBuyersFetchLoading',
      buyersLoadingText: 'getBuyersFetchLoadingText'
    })
  },
  methods: {
    ...mapMutations({
      showCreateBuyerModal: 'SHOW_CREATE_BUYER_MODAL'
    })
  }
}
</script>
