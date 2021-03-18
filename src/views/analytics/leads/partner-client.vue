<template>
  <leads-index>
    <template #action>
      <csv-export @click="fetchPartnerClientLeadsCSV()"></csv-export>
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
      fetchPartnerClientLeadsCSV: 'fetchPartnerClientLeadsCSV'
    })
  },
  components: {
    'csv-export': csvExport,
    'leads-index': leadsIndex
  }
}
</script>
