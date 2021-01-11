<template>
  <panel-template
    title="Partner Contracts"
    :showLoader="loading"
    :loadingText="loadingText">
    <template v-slot:action>
      <button class="btn btn-turquoise" @click="showCreatePartnerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Partner</button>
    </template>
    <template v-slot:content>
      <partner-list v-bind="$attrs"></partner-list>
    </template>
  </panel-template>
</template>

<script>
import partnerList from '@/components/partners/list'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'partner-list': partnerList
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
