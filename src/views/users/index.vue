<template>
  <div>
    <div class="hud">
      <h1 class="text-white text-4xl font-hairline">All Users</h1>
    <div>
      <stat-card v-bind:data="userCount" v-bind:title="`Users`" v-bind:color="`teal`"></stat-card>
    </div>
  </div>
    <user-list v-bind:users="users" class="mt-5"></user-list>

    <h3 class="h3 mt-5 mb-2">Create User</h3>
    <create-user></create-user>
  </div>
</template>

<script>
import axios from '@/axios'
import userList from '@/components/users/list'
import createUser from '@/components/users/create'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      users: [],
      output: ''
    }
  },
  components: {
    'user-list': userList,
    'create-user': createUser
  },
  computed: {
    userCount: function () {
      return this.users.length
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
          this.output = error
          this.errored = true
        })
    }
  },
  created () {
    this.getUsers()
  }
}
</script>
