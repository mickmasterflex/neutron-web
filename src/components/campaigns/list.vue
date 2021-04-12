<template>
  <transition-table-state>
    <table v-if="campaigns.length" class="table table-striped">
      <thead>
        <tr>
          <th class="th">ID</th>
          <th class="th">Name</th>
          <th class="th">Contract</th>
          <th class="th">Campaign Code</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="campaign in this.campaigns" :key="campaign.id">
          <td class="td">{{ campaign.id }}</td>
          <td class="td">
            <span @click="linkToCampaign(campaign)" class="text-link">{{campaign.name}}</span>
          </td>
          <td class="td">{{ campaign.contract_data.name }}</td>
          <td class="td">{{ campaign.code }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Campaigns Exist"
                       key="empty"
                       class="well"
                       copy="Use the 'New Campaign' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    campaigns: Array,
    client: String
  },
  methods: {
    ...mapMutations({
      setCurrentCampaign: 'SET_CURRENT_CAMPAIGN',
      setCurrentClientData: 'SET_CURRENT_CLIENT_DATA',
      setCurrentAncestors: 'SET_CURRENT_ANCESTORS'
    }),
    linkToCampaign (campaign) {
      this.setCurrentCampaign(campaign)
      this.setCurrentClientData(campaign.client_data)
      this.setCurrentAncestors(campaign.partner_ancestors)
      this.$router.push({
        name: 'Campaign',
        params: { client: this.client, partner: campaign.contract, id: campaign.id }
      })
    }
  }
}
</script>
