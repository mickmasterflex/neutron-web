<template>
  <div>
    <table v-if="clients" class="table table-striped">
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
            <table-link :route="{name: 'ClientContracts', params: {slug:client.slug}}">{{buyers(client.buyercontract_set).length}}</table-link>
          </td>
          <td class="td">
            <table-link :route="{name: 'ClientContracts', params: {slug:client.slug}}">{{partners(client.partnercontract_set).length}}</table-link>
          </td>
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
  props: ['clients'],
  methods: {
    partners: function (partners) {
      return partners.filter(partner => partner.parent === null)
    },
    buyers: function (buyers) {
      return buyers.filter(buyer => buyer.parent === null)
    }
  }
}
</script>
