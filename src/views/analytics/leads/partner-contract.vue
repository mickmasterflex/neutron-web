<template>
  <leads-index>
    <template #action>
      <csv-export @click="fetchPartnerContractLeadsCSV($route.params.id)"></csv-export>
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
      fetchPartnerContractLeadsCSV: 'fetchPartnerContractLeadsCSV'
    })
  },
  components: {
    'csv-export': csvExport,
    'leads-index': leadsIndex
  }
}
</script>
