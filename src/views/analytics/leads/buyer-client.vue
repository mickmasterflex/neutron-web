<template>
  <leads-panel-template leads-list-type="buyer">
    <template #action>
      <csv-export @click="fetchBuyerClientLeadsCSV($route.params.id)"></csv-export>
    </template>
  </leads-panel-template>
</template>

<script>
import leadsPanelTemplate from './panel-template'
import csvExport from '@/components/analytics/csv-stats-export'
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      fetchBuyerClientLeadsCSV: 'fetchBuyerClientLeadsCSV'
    })
  },
  components: {
    'csv-export': csvExport,
    'leads-panel-template': leadsPanelTemplate
  }
}
</script>
