<template>
  <leads-index>
    <template #action>
      <csv-export @click="fetchBuyerContractLeadsCSV($route.params.id)"></csv-export>
    </template>
  </leads-index>
</template>

<script>
import leadsIndex from './index'
import csvExport from '@/components/analytics/csv-stats-export'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      fetchBuyerContractLeadsCSV: 'fetchBuyerContractLeadsCSV'
    })
  },
  components: {
    'csv-export': csvExport,
    'leads-index': leadsIndex
  }
}
</script>
