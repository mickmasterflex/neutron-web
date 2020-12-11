<template>
  <div>
    <action-heading>
      <template v-slot:left>
        <h2 class="h3">All Clients</h2>
      </template>
      <template v-slot:right>
        <button class="btn btn-turquoise" @click="showCreateClientModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Client</button>
      </template>
    </action-heading>
    <client-list :clients="clients" class="mt-5"></client-list>
    <create-client></create-client>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import clientList from '@/components/clients/list'
import createClient from '@/components/clients/create'

export default {
  components: {
    'client-list': clientList,
    'create-client': createClient
  },
  computed: {
    ...mapGetters({
      clients: 'getAllClients'
    })
  },
  methods: {
    ...mapActions({
      fetchClients: 'fetchClients'
    }),
    ...mapMutations({
      showCreateClientModal: 'SHOW_CREATE_CLIENT_MODAL'
    })
  },
  created () {
    this.fetchClients()
  }
}
</script>
