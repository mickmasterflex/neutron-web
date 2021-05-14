<template>
  <base-panel-grid>
    <partner-list-panel class="col-span-2" :contracts="partnersByClient(client.id)" :client="$route.params.slug"></partner-list-panel>
    <caps-modal/>
    <create-partner-contract :client="client.id"></create-partner-contract>
  </base-panel-grid>
</template>

<script>
import partnerListPanel from '@/components/partners/list-panel'
import capsModal from '@/components/caps/modal/modal'
import createPartner from '@/components/partners/create'
import { mapGetters } from 'vuex'

export default {
  components: {
    'caps-modal': capsModal,
    'partner-list-panel': partnerListPanel,
    'create-partner-contract': createPartner
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient',
      partnersByClient: 'getParentlessPartnersByClient'
    })
  }
}
</script>
