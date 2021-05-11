<template>
  <content-layout v-if="currentActiveUser">
    <template v-slot:hud-content>
      <div>
        <h1 class="h1 text-white">{{currentActiveUser.first_name}} {{currentActiveUser.last_name}}</h1>
        <p class="text-white">{{currentActiveUser.email}}</p>
      </div>
      <hud-stat-cards>
        <stat-card :data="currentActiveUser.id" title="User ID" key="userId"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:content>
      <base-panel-grid>
        <update-user class="col-span-2 xl:col-span-1" :user="currentActiveUser"></update-user>
        <set-password class="col-span-2 xl:col-span-1"></set-password>
      </base-panel-grid>
    </template>
  </content-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import updateUser from '@/components/users/update'
import setPassword from '@/components/authentication/set-password'

export default {
  computed: {
    ...mapGetters({
      currentActiveUser: 'getCurrentActiveUser',
      currentUser: 'getCurrentUser'
    })
  },
  components: {
    'set-password': setPassword,
    'update-user': updateUser
  }
}
</script>
