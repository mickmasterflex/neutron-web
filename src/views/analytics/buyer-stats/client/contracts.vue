<template>
  <panel-template :showLoader="loading" :loadingText="loadingText" content-background-color="white">
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
      <buyer-contract-list :buyer_stats_contracts="contracts"></buyer-contract-list>
    </template>
  </panel-template>
</template>

<script>
import buyerContractList from '@/components/analytics/buyer-contracts-list'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      contracts: 'getBuyerStatsContracts',
      loading: 'getBuyerStatsContractsFetchLoading',
      loadingText: 'getBuyerStatsContractsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'buyer-contract-list': buyerContractList
  }
}
</script>
