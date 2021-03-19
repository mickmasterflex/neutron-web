<template>
  <content-layout>
    <template v-slot:hud-content>
      <div>
        <h3 class="text-gray-200">Lead Id: {{id}} <span class="text-gray-700">|</span> Email {{data.email}}</h3>
        <h1 class="h1 text-white">{{data.first_name}} {{data.last_name}}</h1>
        <h3 class="text-gray-200">Created At {{createdAt}}</h3>
      </div>
      <hud-stat-cards>
        <stat-card :data="!!lead.sold_at ? 'Sold' : 'Not Sold'" title="Status" :color="!!lead.sold_at ? 'green' : 'red'" key="statusCard" :loading="loading"></stat-card>
        <stat-card :data="lead.revenue ? lead.revenue : '0'" title="Revenue" :color="lead.revenue > 0 ? 'green' : 'red'" key="revenueStatCard" :comma-separated="true" :dollar-amount="true" :loading="loading"></stat-card>
        <stat-card :data="lead.margin ? lead.margin : '0'" title="Margin" key="marginStatCard" :comma-separated="true" :dollar-amount="true" :loading="loading"></stat-card>
        <stat-card :data="lead.payout ? lead.payout : '0'" title="Payout" key="payoutStatCard" :comma-separated="true" :dollar-amount="true" :loading="loading"></stat-card>
        <stat-card :data="lead.reason ? lead.reason : 'None'" title="Reason" :color="lead.reason ? 'green' : 'gray'" key="reasonStatCard" :loading="loading"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'details' ? 'active' : ''">
          <router-link :to="{name: 'LeadDetails', params: { id: id }}">Lead Details</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'transactions' ? 'active' : ''">
          <router-link :to="{name: 'LeadTransactions', params: { id: id }}">Transactions</router-link>
        </li>
      </ul>
    </template>
    <template v-slot:content>
      <router-view/>
    </template>
  </content-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import dayjs from 'dayjs'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      lead: 'getCurrentLead',
      loading: 'getLeadFetchLoading'
    }),
    createdAt () {
      return dayjs(this.lead.created_at)
    },
    data () {
      return this.lead.data ? this.lead.data : {}
    }
  },
  methods: {
    ...mapActions({
      fetchCurrentLead: 'fetchCurrentLead'
    }),
    ...mapMutations({
      setCurrent: 'SET_CURRENT_LEAD',
      resetCurrent: 'RESET_CURRENT_LEAD',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    }),
    setProductBreadcrumbsAndTitle () {
      document.title = 'Lead Data | ' + this.id
      this.setBreadcrumbs([
        { name: 'LeadData', text: 'Search Leads' },
        { name: 'LeadPage', text: this.id, params: { id: this.id } }
      ])
    }
  },
  watch: {
    id () {
      if (this.id !== this.lead.id) {
        this.searchLeads({ ids: [this.id], emails: [] }).then(response => {
          this.setCurrent(response.data[0])
        })
      }
    }
  },
  created () {
    this.fetchCurrentLead(this.id)
    this.setProductBreadcrumbsAndTitle()
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
