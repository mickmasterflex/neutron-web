<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="text-white text-4xl font-hairline">All Clients</h1>
      <div>
        <stat-card v-bind:data="clientCount" v-bind:title="`Clients`" v-bind:color="`teal`"></stat-card>
      </div>
    </div>
    <client-list v-bind:clients="clients" class="mt-5"></client-list>

    <h3 class="h3 mt-5 mb-2">Create Client</h3>
    <create-client></create-client>
  </div>
</template>

<script>
import axios from '../../axios'
import clientList from '../../components/clients/list'
import createClient from '../../components/clients/create'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      clients: [],
      output: ''
    }
  },
  components: {
    'client-list': clientList,
    'create-client': createClient
  },
  computed: {
    clientCount: function () {
      return this.clients.length
    }
  },
  methods: {
    getClients () {
      axios
        .get('/clients/')
        .then(response => {
          this.clients = response.data
        })
        .catch(error => {
          this.output = error
          this.errored = true
        })
    }
  },
  created () {
    this.getClients()
  }
}
</script>
