<template>
  <div>
    <table v-if="contracts" class="table">
      <thead>
        <tr>
          <th class="th">Name</th>
          <th class="th">Id</th>
          <th class="th">Parent</th>
          <th class="th">Client</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="contract in contracts" :key="contract.id">
          <td class="td">
            <router-link :to="{name: 'PartnerContract', params: {client:client, id:contract.id}}" class="text-link">{{contract.name}}</router-link>
          </td>
          <td class="td">{{ contract.id }}</td>
          <td class="td">{{ contract.parent }}</td>
          <td class="td">{{ contract.client }}</td>
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
  props: {
    contracts: Object,
    client: String
  }
}
</script>
