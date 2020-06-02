<template>
  <div>
    <div class="hud">
      <h1 class="text-white text-4xl font-hairline">All Clients</h1>
      <div class="hud--stat-cards">
        <stat-card :data="getAllClientsCount" :title="`Clients`" :color="`teal`"></stat-card>
      </div>
    </div>
    <client-list :clients="clients" class="mt-5"></client-list>
    <h3 class="h3 mt-5 mb-2">Create Client</h3>
    <create-client></create-client>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    ...mapActions({ fetchClients: 'fetchClients' })
  },
  created () {
    this.fetchClients()
  }
}
</script>
