<template>
  <panel-template
    :actionTransition="true"
    :showLoader="loading"
    :loadingText="loadingText"
    content-background-color="white"
  >
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
      <leads-list :leads="leads"></leads-list>
    </template>
  </panel-template>
</template>

<script>
import leadsList from '@/components/analytics/leads-list'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      leads: 'getBuyerClientsLeads',
      loading: 'getBuyerClientsFetchLoading',
      loadingText: 'getBuyerClientsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'leads-list': leadsList
  }
}
</script>
