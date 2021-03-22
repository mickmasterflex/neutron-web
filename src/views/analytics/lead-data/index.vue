<template>
  <content-layout>
    <template v-slot:hud>
      <slot name="hud">
        <lead-search></lead-search>
      </slot>
    </template>
    <template v-slot:content>
      <panel-template
        title="Search Results"
        content-background-color="white"
        :show-loader="loading"
        :loading-text="loadingText"
        :actionTransition="true"
      >
        <template v-slot:action>
          <csv-export @click="searchLeadsCSV()" v-show="leads.length"></csv-export>
        </template>
        <template slot="content">
          <leads-list :leads="leads"></leads-list>
        </template>
      </panel-template>
    </template>
  </content-layout>
</template>

<script>
import leadsList from '@/components/analytics/leads/lists/lead-search-list'
import csvExport from '@/components/analytics/csv-stats-export'
import leadSearch from '@/components/analytics/leads/lead-search'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      leads: 'getLeadSearchResults',
      loading: 'getLeadSearchLoading',
      loadingText: 'getLeadSearchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      searchLeadsCSV: 'searchLeadsCSV'
    })
  },
  components: {
    'csv-export': csvExport,
    'lead-search': leadSearch,
    'leads-list': leadsList
  }
}
</script>
