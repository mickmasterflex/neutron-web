<template>
  <div>
    <table v-if="contracts.length" class="table">
      <thead>
        <tr>
          <th class="th">Name</th>
          <th class="th">Id</th>
          <th class="th">Client</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="contract in contracts" :key="contract.id">
          <td class="td">
            <router-link :to="{name: 'PartnerContract', params: {client:client, id:contract.id}}" class="text-link">{{contract.name}}</router-link>
          </td>
          <td class="td">{{ contract.id }}</td>
          <td class="td">{{ contract.client }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Child Contracts" copy="Use the 'New Partner' button to add children to this contract."></table-empty-state>
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
