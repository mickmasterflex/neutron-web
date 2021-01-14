<template>
  <panel-template
    title="Buyer Contracts"
    :showLoader="loading"
    :loading-text="loadingText">
    <template v-slot:action>
      <div class="flex flex-row">
        <tool-tip class="mr-2"></tool-tip>
        <button class="btn btn-turquoise" @click="showCreateBuyerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Buyer</button>
      </div>
    </template>
    <template v-slot:content>
      <buyer-list v-bind="$attrs"></buyer-list>
    </template>
  </panel-template>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import buyerList from '@/components/buyers/list'
import tooltip from '@/components/buyers/bulk-update/tooltip'

export default {
  components: {
    'buyer-list': buyerList,
    'tool-tip': tooltip
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
