<template>
  <panel-template
    title="Partner Contracts"
    :showLoader="loading"
    :loadingText="loadingText"
    content-background-color="white">
    <template v-slot:action>
      <bulk-update-status v-show="contracts.length" class="mr-2"></bulk-update-status>
      <button class="btn btn-turquoise" @click="showCreatePartnerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Partner</button>
    </template>
    <template v-slot:content>
      <partner-list v-bind="$attrs" :contracts="contracts"></partner-list>
    </template>
  </panel-template>
</template>

<script>
import partnerList from '@/components/partners/list'
import bulkUpdateStatus from '@/components/bulk-update/status/partner-tooltip'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    contracts: Array
  },
  components: {
    'partner-list': partnerList,
    'bulk-update-status': bulkUpdateStatus
  },
  computed: {
    ...mapGetters({
      loading: 'getPartnersFetchLoading',
      loadingText: 'getPartnersFetchLoadingText'
    })
  },
  methods: {
    ...mapMutations({
      showCreatePartnerModal: 'SHOW_CREATE_PARTNER_MODAL'
    })
  }
}
</script>
