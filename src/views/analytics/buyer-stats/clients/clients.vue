<template>
  <panel-template title="Clients" :showLoader="loading" :loadingText="loadingText">
    <template slot="action">
      Date Picker Here
    </template>
    <template slot="content">
      <buyer-client-list :buyer_clients="clients"></buyer-client-list>
    </template>
  </panel-template>
</template>

<script>
import buyerClientList from '@/components/analytics/buyer-clients-list'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      clients: 'getBuyerClients',
      loading: 'getBuyerClientsFetchLoading',
      loadingText: 'getBuyerClientsFetchLoadingText'
    })
  },
  components: {
    'buyer-client-list': buyerClientList
  }
}
</script>
