<template>
  <transition-table-state>
    <table v-if="buyer_contract_stats_offers.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Offer</th>
        <th class="th">Leads</th>
        <th class="th">Sold Leads</th>
        <th class="th">Revenue</th>
        <th class="th">Margin</th>
        <th class="th">Payout</th>
        <th class="th">Scrub Rate</th>
        <th class="th">Margin Percent</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="offer in buyer_contract_stats_offers" :key="offer.id">
        <td class="td">
          <span class="text-link" @click="linkToBuyerStatsOffer({ name: offer.name, id: offer.id })">{{offer.name}}</span>
        </td>
        <td-number :number="offer.lead_count"></td-number>
        <td-number :number="offer.sold_count"></td-number>
        <td-number :dollar="true" :number="offer.revenue"></td-number>
        <td-number :dollar="true" :number="offer.margin"></td-number>
        <td-number :dollar="true" :number="offer.payout"></td-number>
        <td class="td">{{offer.scrub_rate}}</td>
        <td class="td">{{offer.margin_percent}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No stats in selected date range"
                       key="empty"
                       class="well"
                       copy="Try altering the date range"></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    buyer_contract_stats_offers: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyerStatsContract',
      client: 'getCurrentBuyerStatsClient'
    })
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_BUYER_STATS_OFFER_CONTRACT',
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    linkToBuyerStatsOffer (offer) {
      this.resetLeads()
      this.setCurrent(offer)
      this.$router.push({
        name: 'BuyerStatsOfferContract',
        params: { id: offer.id, buyerId: this.contract.id, clientId: this.client.id },
        query: this.$route.query
      })
    }
  }
}
</script>
