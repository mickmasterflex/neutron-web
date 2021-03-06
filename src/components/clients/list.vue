<template>
  <transition-table-state>
    <table v-if="clients.length" class="table table-striped" key="table">
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
            <span @click="linkToClient(client)" class="text-link">{{client.name}}</span>
          </td>
          <td class="td">{{client.id}}</td>
          <td class="td">{{client.slug}}</td>
          <td class="td">
            <table-link @table-link-click="linkToClientBuyers(client)"
                        :number="buyers(client.buyercontract_set).length"
            ></table-link>
          </td>
          <td class="td">
            <table-link @table-link-click="linkToClientPartners(client)"
                        :number="partners(client.partnercontract_set).length"
            ></table-link>
          </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       class="well"
                       heading="No Clients Exist"
                       key="empty"
                       copy="Use the 'New Client' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: ['clients'],
  methods: {
    ...mapMutations({
      setCurrentClient: 'SET_CURRENT_CLIENT',
      setPartners: 'SET_PARTNERS',
      setBuyers: 'SET_BUYERS'
    }),
    partners: function (partners) {
      return partners.filter(partner => partner.parent === null)
    },
    buyers: function (buyers) {
      return buyers.filter(buyer => buyer.parent === null)
    },
    setCurrentClientAndContracts (client) {
      this.setCurrentClient(client)
      this.setPartners(client.partnercontract_set)
      this.setBuyers(client.buyercontract_set)
    },
    linkToClient (client) {
      this.setCurrentClientAndContracts(client)
      this.$router.push({ name: 'Client', params: { slug: client.slug } })
    },
    linkToClientBuyers (client) {
      this.setCurrentClientAndContracts(client)
      this.$router.push({ name: 'ClientBuyerContracts', params: { slug: client.slug } })
    },
    linkToClientPartners (client) {
      this.setCurrentClientAndContracts(client)
      this.$router.push({ name: 'ClientPartnerContracts', params: { slug: client.slug } })
    }
  },
  computed: {
    ...mapGetters({
      loading: 'getClientsFetchLoading',
      loadingText: 'getClientsFetchLoadingText'
    })
  }
}
</script>
