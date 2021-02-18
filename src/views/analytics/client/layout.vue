<template>
  <analytics-layout :hud-title="client.name">
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="contractsRoute">Contracts</router-link>
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
    id: {
      type: Number
    },
    contractsRoute: {
      type: Object,
      required: true
    },
    leadsRoute: {
      type: Object,
      required: true
    },
    fetchClient: {
      type: Function,
      required: true
    },
    client: {
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
  watch: {
    analyticsDateRange () {
      this.fetchClient(this.id)
    },
    client () {
      document.title = this.client.name
    }
  },
  mounted () {
    this.setStart(dayjs(this.$route.query.start_date))
    this.setEnd(dayjs(this.$route.query.end_date))
  },
  destroyed () {
    this.resetLeads()
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
