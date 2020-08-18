<template>
 <div>
   <update-client :client="client"></update-client>
   <delete-client :slug="client.slug" class="mt-4"></delete-client>
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
