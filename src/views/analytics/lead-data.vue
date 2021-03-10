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
          <button class="btn btn-indigo"><font-awesome-icon icon="download"></font-awesome-icon> Export Leads</button>
        </template>
        <template slot="content">
          <leads-list :leads="leads"></leads-list>
        </template>
      </panel-template>
    </template>
  </content-layout>
</template>

<script>
import leadsList from '@/components/analytics/leads/lead-data-list'
import leadSearch from '@/components/analytics/leads/lead-search'
import { mapGetters, mapMutations } from 'vuex'

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
    })
  },
  created () {
    this.resetBreadcrumbs()
  },
  components: {
    'lead-search': leadSearch,
    'leads-list': leadsList
  }
}
</script>
