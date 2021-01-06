<template>
  <transition-table-state>
    <table v-if="campaigns.length" class="table">
      <thead>
        <tr>
          <th class="th">Name</th>
          <th class="th">ID</th>
          <th class="th">Contract</th>
          <th class="th">Campaign Code</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="campaign in this.campaigns" :key="campaign.id">
          <td class="td">
            <router-link :to="{name: 'Campaign', params: { client: client, partner:campaign.contract, id:campaign.id}}" class="underline text-blue-500">{{campaign.name}}</router-link>
          </td>
          <td class="td">{{ campaign.id }}</td>
          <td class="td">{{ campaign.contract }}</td>
          <td class="td">{{ campaign.code }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Campaigns Exist"
                       key="empty"
                       copy="Use the 'New Campaign' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
export default {
  props: {
    campaigns: Array,
    client: String
  }
}
</script>
