<template>
  <div>
    <div class="hud">
      <h1 class="text-white text-4xl font-hairline">All Users</h1>
      <div class="hud--stat-cards">
        <stat-card :data="getAllUsersCount" :title="`Users`" :color="`teal`"></stat-card>
      </div>
    </div>
    <user-list :users="users" class="mt-5"></user-list>
    <h3 class="h3 mt-5 mb-2">Create User</h3>
    <create-user></create-user>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import userList from '@/components/users/list'
import createUser from '@/components/users/create'

export default {
  components: {
    'user-list': userList,
    'create-user': createUser
  },
  computed: {
    ...mapGetters({
      users: 'getAllUsers',
      getAllUsersCount: 'getAllUsersCount'
    })
  },
  methods: {
    ...mapActions({ fetchUsers: 'fetchUsers' })
  },
  created () {
    this.fetchUsers()
  }
}
</script>
