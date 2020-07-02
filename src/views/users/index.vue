<template>
  <content-layout>
    <template v-slot:hud>
      <div class="hud">
        <h1 class="text-white text-4xl font-hairline">All Users</h1>
        <div class="hud--stat-cards">
          <stat-card :data="getAllUsersCount" :title="`Users`" :color="`teal`"></stat-card>
        </div>
      </div>
    </template>
    <template v-slot:content>
      <div class="flex flex-row justify-between">
        <h2 class="h3">Users</h2>
        <button class="btn btn-green" @click="showCreateUserModal()">Create User</button>
      </div>
      <user-list :users="users" class="mt-5"></user-list>
      <create-user></create-user>
    </template>
  </content-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
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
    ...mapActions({ fetchUsers: 'fetchUsers' }),
    ...mapMutations({ showCreateUserModal: 'SHOW_CREATE_USER_MODAL' })
  },
  created () {
    this.fetchUsers()
  }
}
</script>
