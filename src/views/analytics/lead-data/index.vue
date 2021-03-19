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
import leadsList from '@/components/analytics/leads/lists/lead-data-list'
import leadSearch from '@/components/analytics/leads/lead-search'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      leads: 'getLeadSearchResults',
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
