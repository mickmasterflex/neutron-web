<template>
  <transition-table-state>
    <table v-if="clients.length" class="table table-striped">
      <thead>
        <tr>
          <th class="th">Client</th>
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
        <tr class="tr" v-for="client in clients" :key="client.id">
          <td class="td">
            <span class="text-link" @click="linkToClient(client)">{{client.name}}</span>
          </td>
          <td class="td">
            <table-link :number="client.lead_count"
                        v-if="client.lead_count"
                        @table-link-click="linkToClientLeads({ name: client.name, id: client.id })"
            ></table-link>
            <span v-else class="italic text-gray-500">None</span>
          </td>
          <td-number :number="client.soldCount"></td-number>
          <td-number :dollar="true" :number="client.revenue"></td-number>
          <td-number :dollar="true" :number="client.margin"></td-number>
          <td-number :dollar="true" :number="client.payout"></td-number>
          <td class="td">{{client.scrub_rate}}</td>
          <td class="td">{{client.margin_percent}}</td>
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    clientRouteName: {
      type: String,
      required: true,
      validator: function (value) {
        return ['BuyerStatsClient', 'PartnerStatsClient'].includes(value)
      }
    },
    leadsRouteName: {
      type: String,
      required: true,
      validator: function (value) {
        return ['BuyerStatsClientLeads', 'PartnerStatsClientLeads'].includes(value)
      }
    }
  },
  computed: {
    ...mapGetters({
      clients: 'getAllClientsStats'
    })
  },
  methods: {
    ...mapMutations({
      setCurrent: 'SET_CURRENT_CLIENT_STATS',
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    linkToClient (client) {
      this.setCurrent(client)
      this.$router.push({
        name: this.clientRouteName,
        params: { id: client.id },
        query: this.$route.query
      })
    },
    linkToClientLeads (client) {
      this.resetLeads()
      this.setCurrent(client)
      this.$router.push({
        name: this.leadsRouteName,
        params: { id: client.id },
        query: this.$route.query
      })
    }
  }
}
</script>
