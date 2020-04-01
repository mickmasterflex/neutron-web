<template>
  <div v-if="clients">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="text-white text-4xl font-hairline">All Clients</h1>
      <div>
        <stat-card v-bind:data="clientCount" v-bind:title="`Clients`" v-bind:color="`teal`"></stat-card>
      </div>
    </div>
    <create-client class="my-3 float-right"></create-client>
    <client-list v-bind:clients="clients"></client-list>
  </div>
</template>

<script>
import axios from '../../axios'
import clientList from '../../components/clients/list'
import createClient from '../../components/clients/create'
import statCard from '../../components/utilities/cards/stat-card'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      clients: null,
      output: ''
    }
  },
  components: {
    'client-list': clientList,
    'create-client': createClient,
    'stat-card': statCard
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
