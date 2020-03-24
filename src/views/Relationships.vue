<template>
  <div>
    <h1>This is relationships</h1>
    <h3>Clients</h3>
    <ul v-if="clients">
      <li v-for="client in clients" v-bind:key="client.slug">
        • {{ client.name }} - (buyer contract set {{ client.buyercontract_set }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      clients: null
    }
  },
  methods: {
    getClients () {
      axios
        .get('http://neutron.localhost:8000/api/clients/')
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
