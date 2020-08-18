<template>
 <div>
  <h3 class="h3 mb-2">Edit Client</h3>
  <update-client :client="client"></update-client>
  <h3 class="h3 mt-5 mb-2">Delete Client</h3>
  <delete-client :slug="client.slug"></delete-client>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import deleteClient from '@/components/clients/delete'
import updateClient from '@/components/clients/update'

export default {
  components: {
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
      return this.getPartnersByClient(this.client.id)
    },
    buyers: function () {
      return this.getBuyersByClient(this.client.id)
    }
  }
}
</script>
