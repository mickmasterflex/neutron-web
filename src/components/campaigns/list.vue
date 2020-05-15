<template>
  <div>
    <table v-if="campaigns" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">ID</th>
        <th class="th">Contract</th>
        <th class="th">Campaign Code</th>
      </tr>
      <tr v-for="campaign in this.campaigns" :key="campaign.id">
        <td class="td">
          <router-link :to="{name: 'Campaign', params: { client: campaign.client, partner:campaign.contract, id:campaign.id}}" class="underline text-blue-500">{{campaign.name}}</router-link>
        </td>
        <td>{{ campaign.id }}</td>
        <td>{{ campaign.contract }}</td>
        <td>{{ campaign.campaign_code }}</td>
      </tr>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
export default {
  props: { campaigns: Array }
}
</script>
