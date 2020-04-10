<template>
  <table v-if="users" class="w-full">
    <tr class="th-row">
      <th class="th">Name</th>
      <th class="th">Id</th>
      <th class="th">Email</th>
    </tr>
    <tr v-for="user in users" :key="user.id">
      <td>{{ user.first_name }} {{ user.last_name }}</td>
      <td>{{ user.id }}</td>
      <td>{{ user.email }}</td>
    </tr>
  </table>
  <div v-else>
    ...Loading...
  </div>
</template>

<script>
import axios from '../../axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      users: null,
      error: null
    }
  },
  methods: {
    getUsers () {
      axios
        .get('/users/')
        .then(response => {
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
