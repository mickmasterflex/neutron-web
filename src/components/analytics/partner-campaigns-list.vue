<template>
  <transition-table-state>
    <table v-if="campaigns.length" class="table table-striped">
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
      <tr class="tr" v-for="campaign in campaigns" :key="campaign.id">
        <td class="td">
          <span class="text-link" @click="linkToPartnerStatsCampaign({ name: campaign.name, id: campaign.id })">{{campaign.name}}</span>
        </td>
        <td class="td">{{campaign.lead_count}}</td>
        <td class="td">{{campaign.sold_count}}</td>
        <td-dollar :dollar="campaign.revenue"></td-dollar>
        <td-dollar :dollar="campaign.margin"></td-dollar>
        <td-dollar :dollar="campaign.payout"></td-dollar>
        <td class="td">{{campaign.scrub_rate}}</td>
        <td class="td">{{campaign.margin_percent}}</td>
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
    campaigns: {
      type: [Object, Array],
      required: true
    }
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentPartnerStatsContract',
      client: 'getCurrentPartnerStatsClient'
    })
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_PARTNER_STATS_CAMPAIGN'
    }),
    linkToPartnerStatsCampaign (campaign) {
      this.setCurrent(campaign)
      this.$router.push({
        name: 'PartnerStatsCampaign',
        params: { id: campaign.id, partnerId: this.contract.id, clientId: this.client.id },
        query: this.$route.query
      })
    }
  }
}
</script>
