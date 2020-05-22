<template>
  <div v-if="user">
    <div class="hud">
      <div>
        <h1 class="h1 text-white">{{user.first_name}} {{user.last_name}}</h1>
        <p class="text-white">{{user.email}}</p>
      </div>
      <div>
        <stat-card :data="user.id" :title="`User ID`" :color="`teal`"></stat-card>
      </div>
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
