<template>
  <client-layout activeTab="details" :id="id" :partners="partners" :buyers="buyers">
    <template v-slot:content>
      <update-client :client="client"></update-client>
      <delete-client :id="client.id" class="mt-4"></delete-client>
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
