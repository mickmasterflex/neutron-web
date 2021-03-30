<template>
  <analytics-panel-template>
    <template slot="action">
      <slot name="action"></slot>
    </template>
    <template slot="content">
      <buyer-leads-list :leads="leads" v-if="leadsListType === 'buyer'"></buyer-leads-list>
      <partner-leads-list :leads="leads" v-if="leadsListType === 'partner'"></partner-leads-list>
    </template>
  </analytics-panel-template>
</template>

<script>
import buyerLeadsList from '@/components/analytics/leads/lists/buyer-stats-list'
import partnerLeadsList from '@/components/analytics/leads/lists/partner-stats-list'
import analyticsPanelTemplate from '@/components/analytics/panel-template'
import { mapGetters } from 'vuex'

export default {
  props: {
    leadsListType: {
      required: true,
      validator (value) {
        return ['buyer', 'partner'].includes(value)
      }
    }
  },
  computed: {
    ...mapGetters({
      leads: 'getAnalyticsLeads'
    })
  },
  components: {
    'buyer-leads-list': buyerLeadsList,
    'partner-leads-list': partnerLeadsList,
    'analytics-panel-template': analyticsPanelTemplate
  }
}
</script>
