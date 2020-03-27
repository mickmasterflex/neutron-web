<template>
  <div>
    <h1>{{account.email}}</h1>
    <h2>{{account.first_name}} {{account.last_name}}</h2>
    <p>Staff: {{account.is_staff}}</p>
    <delete-user v-bind:id="id"></delete-user>
  </div>
</template>

<script>
import axios from 'axios'
import deleteUser from '../../components/accounts/delete'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      apiBaseUrl: 'http://proton.localhost:8000/api',
      output: null,
      account: {
        email: '',
        first_name: '',
        last_name: '',
        is_staff: null
      }
    }
  },
  props: ['id'],
  components: {
    deleteUser
  },
  methods: {
    getUser () {
      axios
        .get(`${this.apiBaseUrl}/users/${this.id}/`)
        .then(response => {
          this.output = response
          this.account = response.data
        })
        .catch(error => {
          this.output = error
          this.errored = true
        })
    }
  },
  created () {
    this.getUser()
  }
}
</script>
