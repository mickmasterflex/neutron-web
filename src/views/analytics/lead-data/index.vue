<template>
  <content-layout>
    <template v-slot:hud>
      <lead-search></lead-search>
    </template>
    <template v-slot:content>
      <panel-template
        title="Search Results"
        content-background-color="white"
        :show-loader="loading"
        :loading-text="loadingText"
      >
        <template v-slot:action>
          <csv-export @click="searchLeadsCSV()"></csv-export>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      leads: 'getLeadSearchResults',
      loading: 'getLeadSearchLoading',
      loadingText: 'getLeadSearchLoadingText'
    })
  },
  methods: {
    ...mapMutations({
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    }),
    ...mapActions({
      searchLeadsCSV: 'searchLeadsCSV'
    })
  },
  created () {
    this.resetBreadcrumbs()
  },
  components: {
    'csv-export': csvExport,
    'lead-search': leadSearch,
    'leads-list': leadsList
  }
}
</script>
