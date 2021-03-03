<template>
  <analytics-layout
    :hud-title="contract.name"
    :fetchStats="fetchContractStats"
    :fetch-id="id"
  >
    <template v-slot:statCards>
      <slot name="statCards"></slot>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <slot name="contentTab"></slot>
        <li class="underscore-tab underscore-tab-lg"
            :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="leadsRoute">Leads <label-number :number="leadCount"></label-number></router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </analytics-layout>
</template>

<script>
import analyticsLayout from '@/views/analytics/layout.vue'
import { mapGetters } from 'vuex'

export default {
  props: {
    clientId: Number,
    id: Number,
    contract: {
      type: Object,
      required: true
    },
    leadsRoute: {
      type: Object,
      required: true
    },
    fetchContractStats: {
      type: Function,
      required: true
    }
  },
  watch: {
    contract () {
      document.title = this.contract.name
    }
  },
  computed: {
    ...mapGetters({
      leadCount: 'getAnalyticsTotalLeadCount'
    })
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
