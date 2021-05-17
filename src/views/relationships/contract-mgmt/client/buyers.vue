<template>
  <base-panel-grid>
    <buyer-list-panel class="col-span-2" :contracts="buyersByClient(client.id)" :client="$route.params.slug"></buyer-list-panel>
    <create-buyer-contract :client="client.id"></create-buyer-contract>
  </base-panel-grid>
</template>

<script>
import buyerList from '@/components/contracts/buyers/list-panel'
import createBuyer from '@/components/contracts/buyers/create'
import { mapGetters } from 'vuex'

export default {
  components: {
    'buyer-list-panel': buyerList,
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
