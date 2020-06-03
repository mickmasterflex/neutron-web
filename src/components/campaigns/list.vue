<template>
  <div>
    <table v-if="campaigns" class="table">
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
            <router-link :to="{name: 'Campaign', params: { client: campaign.client, partner:campaign.contract, id:campaign.id}}" class="underline text-blue-500">{{campaign.name}}</router-link>
          </td>
          <td class="td">{{ campaign.id }}</td>
          <td class="td">{{ campaign.contract }}</td>
          <td class="td">{{ campaign.code }}</td>
        </tr>
      </tbody>
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
