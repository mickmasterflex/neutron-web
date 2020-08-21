<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">All Clients</h1>
      <div class="hud--stat-cards">
        <stat-card :data="getAllClientsCount" :title="`Clients`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:content>
      <action-heading>
        <template v-slot:left>
          <h2 class="h3">Client List</h2>
        </template>
        <template v-slot:right>
          <button class="btn btn-turquoise" @click="showCreateClientModal()"><font-awesome-icon icon="plus"></font-awesome-icon> Create Client</button>
        </template>
      </action-heading>
      <client-list :clients="clients" class="mt-5"></client-list>
      <create-client></create-client>
    </template>
  </content-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import clientList from '@/components/clients/list'
import createClient from '@/components/clients/create'

export default {
  components: {
    'client-list': clientList,
    'create-client': createClient
  },
  computed: {
    ...mapGetters({
      clients: 'getAllClients',
      getAllClientsCount: 'getAllClientsCount'
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
