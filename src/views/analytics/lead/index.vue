<template>
  <content-layout>
    <template v-slot:hud>
      <div>
        <h3 class="text-gray-200">Lead Id: {{id}} Created At {{createdAt}}</h3>
        <h1 class="h1 text-white">{{data.email}} {{lead.last_name}}</h1>
      </div>
      <hud-stat-cards>
        <stat-card :data="!!lead.sold_at ? 'Sold' : 'Not Sold'" title="Status" :color="!!lead.sold_at ? 'green' : 'red'" key="statusCard"></stat-card>
        <stat-card :data="lead.revenue" title="Revenue" :color="lead.revenue > 0 ? 'green' : 'red'" key="revenueStatCard" :comma-separated="true" :dollar-amount="true"></stat-card>
        <stat-card :data="lead.margin" title="Margin" key="marginStatCard" :comma-separated="true" :dollar-amount="true"></stat-card>
        <stat-card :data="lead.payout" title="Payout" key="payoutStatCard" :comma-separated="true" :dollar-amount="true"></stat-card>
        <stat-card :data="lead.reason ? lead.reason : 'None'" title="Reason" :color="lead.reason ? 'green' : 'gray'" key="reasonStatCard" ></stat-card>
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
      lead: 'getCurrentLead'
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
      searchLeads: 'searchLeads'
    }),
    ...mapMutations({
      setCurrent: 'SET_CURRENT_LEAD',
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
        console.log(this.id)
        this.searchLeads({ ids: [this.id], emails: [] }).then(response => {
          this.setCurrent(response.data[0])
        })
      }
    }
  },
  created () {
    this.searchLeads({ ids: [this.id], emails: [] })
    this.setProductBreadcrumbsAndTitle()
  }
}
</script>
