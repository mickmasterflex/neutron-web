<template>
  <content-layout v-if="user">
    <template v-slot:hud>
      <div>
        <h1 class="h1 text-white">{{user.first_name}} {{user.last_name}}</h1>
        <p class="text-white">{{user.email}}</p>
      </div>
      <div class="hud--stat-cards">
        <stat-card :data="user.id" :title="`User ID`" :color="`teal`"></stat-card>
      </div>
    </template>
    <template v-slot:content>
      <update-user :user="user"></update-user>
      <delete-user :id="user.id" class="mt-4"></delete-user>
    </template>
  </content-layout>
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
