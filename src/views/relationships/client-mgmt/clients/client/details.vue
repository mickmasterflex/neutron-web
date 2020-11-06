<template>
 <base-panel-grid>
   <update-client :client="client" class="col-span-2 xl:col-span-1"></update-client>
   <panel-template title="Danger Zone" class="col-span-2">
     <template #content>
       <delete-client :slug="client.slug"></delete-client>
     </template>
   </panel-template>
 </base-panel-grid>
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
