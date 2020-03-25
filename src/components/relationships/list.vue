<template>
  <ul v-if="clients">
    <li v-for="client in clients" v-bind:key="client.id">
      <router-link :to="{name: 'Client', params: {id:client.id}}" class="underline text-blue-500">
        {{ client.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      apiBaseUrl: 'http://neutron.localhost:8000/api',
      clients: null
    }
  },
  methods: {
    getClients () {
      axios
        .get(`${this.apiBaseUrl}/clients/`)
        .then(response => {
          console.log(response)
          this.clients = response.data
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    }
  },
  created () {
    this.getClients()
  }
}
</script>
