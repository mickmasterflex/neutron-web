<template>
  <leads-panel-template>
    <template #action>
      <csv-export @click="fetchPartnerClientsLeadsCSV()"></csv-export>
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
      fetchPartnerClientsLeadsCSV: 'fetchPartnerClientsLeadsCSV'
    })
  },
  components: {
    'csv-export': csvExport,
    'leads-panel-template': leadsPanelTemplate
  }
}
</script>
