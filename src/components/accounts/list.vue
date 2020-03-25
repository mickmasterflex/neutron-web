<template>
  <ul>
    <li v-for="user in users" v-bind:key="user.email">
      <router-link :to="{name: 'Account', params: {id:user.id}}" class="underline text-blue-500">
        {{ user.email }}
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
      users: null,
      error: null
    }
  },
  methods: {
    getUsers () {
      axios
        .get(`${this.apiBaseUrl}/users/`)
        .then(response => {
          console.log(response)
          this.users = response.data
        })
        .catch(error => {
          console.log(error)
          this.errored = true
          this.error = error
        })
    }
  },
  created () {
    this.getUsers()
  }
}
</script>
