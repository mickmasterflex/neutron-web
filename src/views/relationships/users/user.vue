<template>
  <div v-if="user">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
    <p class="h1 text-white">{{user.first_name}} {{user.last_name}}</p>
      <div>
        <stat-card :data="user.id" :title="`User ID`" :color="`teal`"></stat-card>
      </div>
      <p class="text-white text-1xl font-hairline">{{user.email}}</p>
  </div>
    <h3 class="h3 mt-5 mb-2">Delete User</h3>
    <delete-user :id="user.id"></delete-user>

    <h3 class="h3 mt-5 mb-2">Edit</h3>
    <update-user :id="user.id"></update-user>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteUser from '@/components/users/delete'
import updateUser from '@/components/users/update'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-user': deleteUser,
    'update-user': updateUser
  },
  computed: {
    ...mapGetters({
      user: 'getCurrentUser'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentUser: 'fetchCurrentUser'
    })
  },
  created () {
    this.fetchCurrentUser(this.id)
  }
}
</script>
