<template>
  <contract-layout :contract="contract"
                   :clientId="clientId"
                   :id="id"
                   :leadsRoute="{
                     name: 'BuyerStatsContractLeads',
                     params: { clientId: clientId, id: id },
                     query: $route.query
                     }"
                   :fetchContractStats="fetchBuyerContractStats"
                   :key="$route.params.id"
  >
    <template v-slot:statCards>
      <stat-card :data="offers.length" title="Offers" key="offerCountStatCard" ></stat-card>
    </template>
    <template v-slot:contentTab>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
        <router-link :to="{
          name: 'BuyerStatsContractContracts',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Contracts</router-link>
      </li>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'offers' ? 'active' : ''">
        <router-link :to="{
          name: 'BuyerStatsContractOffers',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Offers <label-number :number="offers.length"></label-number></router-link>
      </li>
    </template>
  </contract-layout>
</template>

<script>
import contractLayout from '@/views/analytics/contract/layout'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  data () {
    return {
      BuyerStatsClients: {
        name: 'BuyerStatsClients',
        text: 'All Clients',
        query: this.$route.query
      },
      BuyerStatsClientContracts: {
        name: 'BuyerStatsClientContracts',
        text: this.$route.params.clientId,
        params: { id: this.$route.params.clientId },
        query: this.$route.query
      },
      BuyerStatsContract: {
        name: 'BuyerStatsContract',
        text: this.$route.params.id,
        params: {
          clientId: this.$route.params.clientId,
          id: this.$route.params.id
        },
        query: this.$route.query
      }
    }
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyerStatsContract',
      buyerClient: 'getCurrentBuyerStatsClient',
      offers: 'getBuyerContractStatsOffers',
      ancestors: 'getBuyerContractStatsAncestors',
      loading: 'getAnalyticsFetchLoading'
    })
  },
  watch: {
    contract () {
      this.BuyerStatsContract.text = this.contract.name
    },
    buyerClient () {
      this.BuyerStatsClientContracts.text = this.buyerClient.name
    },
    loading () {
      this.setBreadcrumbsWithAncestors()
    }
  },
  created () {
    this.setBreadcrumbs([
      this.BuyerStatsClients,
      this.BuyerStatsClientContracts,
      this.BuyerStatsContract
    ])
  },
  methods: {
    setBreadcrumbsWithAncestors () {
      const breadcrumbs = [
        this.BuyerStatsClients,
        this.BuyerStatsClientContracts
      ]
      this.ancestors.forEach(ancestor => {
        breadcrumbs.push({
          name: 'BuyerStatsContract',
          text: ancestor.name,
          params: {
            clientId: this.$route.params.clientId,
            id: ancestor.id
          },
          query: this.$route.query
        })
      })
      breadcrumbs.push(this.BuyerStatsContract)
      this.setBreadcrumbs(breadcrumbs)
    },
    ...mapActions({
      fetchBuyerContractStats: 'fetchBuyerContractStats'
    }),
    ...mapMutations({
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
    })
  },
  components: {
    'contract-layout': contractLayout
  }
}
</script>
