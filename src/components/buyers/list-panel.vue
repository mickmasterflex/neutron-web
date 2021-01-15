<template>
  <panel-template
    title="Buyer Contracts"
    :showLoader="loading"
    :loading-text="loadingText">
    <template v-slot:action>
      <bulk-update-status class="mr-2"></bulk-update-status>
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
import bulkUpdateStatus from '@/components/bulk-update/status/buyer-tooltip'

export default {
  components: {
    'buyer-list': buyerList,
    'bulk-update-status': bulkUpdateStatus
  },
  computed: {
    ...mapGetters({
      loading: 'getBuyersFetchLoading',
      loadingText: 'getBuyersFetchLoadingText'
    })
  },
  methods: {
    ...mapMutations({
      showCreateBuyerModal: 'SHOW_CREATE_BUYER_MODAL'
    })
  }
}
</script>
