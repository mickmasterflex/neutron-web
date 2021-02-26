<template>
  <content-layout>
    <template v-slot:hud>
      <slot name="hud">
        <div>
          <h1 class="text-gray-300 text-4xl font-hairline">Search All Leads</h1>
          <p class="text-gray-400">Search by ID or email address. Separate with commas.</p>
        </div>
        <lead-search></lead-search>
      </slot>
    </template>
    <template v-slot:content>
      <panel-template
        title="Search Results"
        content-background-color="white"
        :show-loader="loading"
        :loading-text="loadingText"
      >
        <template v-slot:action>
          <button class="btn btn-indigo" :class="leads.length === 0 ? 'disabled' : ''" :disabled="leads.length === 0"><font-awesome-icon icon="download"></font-awesome-icon> Export Leads</button>
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
import leadSearch from '@/components/analytics/lead-search'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      leads: 'getAnalyticsLeads',
      loading: 'getLeadSearchLoading',
      loadingText: 'getLeadSearchLoadingText'
    })
  },
  components: {
    'lead-search': leadSearch,
    'leads-list': leadsList
  }
}
</script>
