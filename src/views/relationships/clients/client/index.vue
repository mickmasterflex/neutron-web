<template>
  <client-layout activeTab="details" :id="id" :partners="partners" :buyers="buyers">
    <template v-slot:content>
      <h3 class="h3 mb-2">Edit Client</h3>
      <update-client :client="client"></update-client>
      <h3 class="h3 mt-5 mb-2">Delete Client</h3>
      <delete-client :id="client.id"></delete-client>
    </template>
  </client-layout>
</template>

<script>
import clientLayout from '@/views/relationships/clients/client/layout'
import { mapGetters } from 'vuex'
import deleteClient from '@/components/clients/delete'
import updateClient from '@/components/clients/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'client-layout': clientLayout,
    'delete-client': deleteClient,
    'update-client': updateClient
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient',
      getPartnersByClient: 'getPartnersByClient',
      getBuyersByClient: 'getBuyersByClient'
    }),
    partners: function () {
      return this.getPartnersByClient(this.id)
    },
    buyers: function () {
      return this.getBuyersByClient(this.id)
    }
  }
}
</script>
