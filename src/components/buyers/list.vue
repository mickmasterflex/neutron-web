<template>
  <div>
    <table v-if="contracts.length" class="table table-white table-border">
      <thead>
        <tr>
          <th class="th">Name</th>
          <th class="th">Id</th>
          <th class="th">Client</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="contract in this.contracts" :key="contract.id">
          <td class="td">
            <router-link :to="{name: 'BuyerContract', params: {client:client, id:contract.id}}" class="text-link">{{contract.name}}</router-link>
          </td>
          <td class="td">{{ contract.id }}</td>
          <td class="td">{{ contract.client }}</td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="No Child Contracts" copy="Use the 'New Buyer' button to add children to this contract."></table-empty-state>
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
