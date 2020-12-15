<template>
  <div>
    <table v-if="clients.length" class="table table-striped">
      <thead>
        <tr>
          <th class="th">Name</th>
          <th class="th">ID</th>
          <th class="th">Slug</th>
          <th class="th">Buyer Contracts</th>
          <th class="th">Partner Contracts</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="client in clients" :key="client.id">
          <td class="td">
            <router-link :to="{name: 'Client', params: {slug:client.slug}}" class="text-link">{{client.name}}</router-link>
          </td>
          <td class="td">{{client.id}}</td>
          <td class="td">{{client.slug}}</td>
          <td class="td">
            <table-link :route="{name: 'ClientContracts', params: {slug:client.slug}}">{{client.buyercontract_set.length}}</table-link>
          </td>
          <td class="td">
            <table-link :route="{name: 'ClientContracts', params: {slug:client.slug}}">{{client.partnercontract_set.length}}</table-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       class="well"
                       heading="No Clients Exist"
                       copy="Use the 'New Client' button to get started."></table-empty-state>
  </div>
</template>

<script>
export default {
  props: ['clients']
}
</script>
