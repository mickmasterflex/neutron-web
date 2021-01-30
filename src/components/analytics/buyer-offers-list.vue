<template>
  <transition-table-state>
    <table v-if="buyer_stats_offers.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">Name</th>
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
      <tr class="tr" v-for="offer in buyer_stats_offers" :key="offer.id">
        <td class="td">
          <span class="text-link" @click="linkToBuyerStatsOffer({ name: offer.name, id: offer.id })">{{offer.name}}</span>
        </td>
        <td class="td">{{offer.lead_count}}</td>
        <td class="td">{{offer.sold_count}}</td>
        <td class="td">{{offer.revenue}}</td>
        <td class="td">{{offer.margin}}</td>
        <td class="td">{{offer.payout}}</td>
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
import { mapMutations } from 'vuex'

export default {
  props: {
    buyer_stats_offers: {
      type: [Object, Array],
      required: true
    }
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_BUYER_STATS_OFFER'
    }),
    linkToBuyerStatsOffer (offer) {
      this.setCurrent(offer)
      this.$router.push({ name: 'BuyerStatsOffer', params: { id: offer.id } })
    }
  }
}
</script>
