<template>
  <analytics-layout :hud-title="hudTitle">
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'clients' ? 'active' : ''">
          <router-link :to="clientsRoute">Clients</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="leadsRoute">Leads</router-link>
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
import { mapGetters, mapMutations } from 'vuex'
import dayjs from 'dayjs'

export default {
  props: {
    hudTitle: {
      type: String,
      default: 'All Clients'
    },
    fetchClients: {
      type: Function,
      required: true
    },
    clientsRoute: {
      type: Object,
      required: true
    },
    leadsRoute: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      analyticsDateRange: 'getAnalyticsDateRange'
    })
  },
  methods: {
    ...mapMutations({
      resetLeads: 'RESET_ANALYTICS_LEADS',
      setStart: 'SET_ANALYTICS_START_DATE',
      setEnd: 'SET_ANALYTICS_END_DATE'
    })
  },
  mounted () {
    this.setStart(dayjs(this.$route.query.start_date))
    this.setEnd(dayjs(this.$route.query.end_date))
  },
  watch: {
    analyticsDateRange () {
      this.fetchClients()
    }
  },
  destroyed () {
    this.resetLeads()
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
