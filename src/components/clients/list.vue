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
            <table-link :route="{name: 'ClientContracts', params: {slug:client.slug}}">{{buyers(client.buyercontract_set).length}}</table-link>
          </td>
          <td class="td">
            <table-link :route="{name: 'ClientContracts', params: {slug:client.slug}}">{{partners(client.partnercontract_set).length}}</table-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table-loading-state v-else-if="loading"
                       class="well"
                       heading="Loading Clients"></table-loading-state>
    <table-empty-state v-else
                       class="well"
                       heading="No Clients Exist"
                       copy="Use the 'New Client' button to get started."></table-empty-state>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['clients'],
  methods: {
    partners: function (partners) {
      return partners.filter(partner => partner.parent === null)
    },
    buyers: function (buyers) {
      return buyers.filter(buyer => buyer.parent === null)
    }
  },
  computed: {
    ...mapGetters({
      loading: 'getClientsFetchLoading'
    })
  }
}
</script>
