<template>
  <div>
    <table v-if="contracts.length" class="table table-white">
      <thead>
        <tr>
          <th class="th w-64">Name</th>
          <th class="th w-32">Status</th>
          <th class="th w-16">Id</th>
          <th class="th">Client</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr w-64" v-for="contract in contracts" :key="contract.id">
          <td class="td">
            <router-link :to="{name: 'PartnerContract', params: {client:client, id:contract.id}}" class="text-link">{{contract.name}}</router-link>
          </td>
          <td class="td w-32">
            <status-indicator :red="contract.status === 'terminated'"
                              :green="contract.status === 'active'"
                              :yellow="contract.status === 'paused'">
              {{ contract.status }}
            </status-indicator>
          </td>
          <td class="td w-16">{{ contract.id }}</td>
          <td class="td">{{ contract.client }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Partner Contracts" copy="Use the 'New Partner' button to add children to this contract."></table-empty-state>
  </div>
</template>

<script>
export default {
  props: {
    contracts: Array,
    client: String
  }
}
</script>
