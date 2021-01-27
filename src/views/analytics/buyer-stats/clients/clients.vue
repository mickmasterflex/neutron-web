<template>
  <panel-template :showLoader="loading" :loadingText="loadingText">
    <template slot="title">
      <span class="flex flex-row items-center bg-gray-200 rounded-full p-1">
        <button class="btn-blue btn btn-circle btn-md">
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
        </button>
        <span class="font-bold px-2">
          {{ dateRangeText }}
        </span>
      </span>
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
      loadingText: 'getBuyerClientsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'buyer-client-list': buyerClientList
  }
}
</script>
