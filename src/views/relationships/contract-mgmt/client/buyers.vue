<template>
  <base-panel-grid>
    <buyer-list-panel class="col-span-2" :contracts="buyersByClient(client.id)" :client="$route.params.slug"></buyer-list-panel>
    <caps-modal/>
    <create-buyer-contract :client="client.id"></create-buyer-contract>
  </base-panel-grid>
</template>

<script>
import buyerList from '@/components/buyers/list-panel'
import capsModal from '@/components/caps/modal/modal'
import createBuyer from '@/components/buyers/create'
import { mapGetters } from 'vuex'

export default {
  components: {
    'buyer-list-panel': buyerList,
    'caps-modal': capsModal,
    'create-buyer-contract': createBuyer
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient',
      buyersByClient: 'getParentlessBuyersByClient'
    })
  }
}
</script>
