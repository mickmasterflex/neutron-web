<template>
  <content-layout>
    <template v-slot:hud-content>
      <h1 class="text-white text-4xl font-hairline">All Users</h1>
      <hud-stat-cards>
        <stat-card :data="getAllUsersCount" title="Users" key="userCount"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:content>
      <panel-template title="Users" :showLoader="loading" :loadingText="loadingText" content-background-color="white">
        <template slot="action">
          <button class="btn btn-turquoise" @click="showCreateUserModal()">
            <font-awesome-icon icon="plus"></font-awesome-icon> Add User
          </button>
        </template>
        <template slot="content">
          <user-list :users="users"></user-list>
        </template>
      </panel-template>
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
      getAllUsersCount: 'getAllUsersCount',
      loading: 'getUsersFetchLoading',
      loadingText: 'getUsersFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchUsers: 'fetchUsers'
    }),
    ...mapMutations({
      showCreateUserModal: 'SHOW_CREATE_USER_MODAL',
      resetBreadcrumbs: 'RESET_CURRENT_BREADCRUMBS'
    })
  },
  created () {
    this.resetBreadcrumbs()
    this.fetchUsers()
  }
}
</script>
