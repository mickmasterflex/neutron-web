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
      <base-panel-grid>
        <update-user :user="user" class="col-span-2 xl:col-span-1"></update-user>
        <panel-template title="Danger Zone" class="col-span-2" :showLoader="loading" :loadingText="loadingText">
          <template #content>
            <delete-user :id="user.id"></delete-user>
          </template>
        </panel-template>
      </base-panel-grid>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
      user: 'getCurrentUser',
      loading: 'getUserFetchLoading',
      loadingText: 'getUserFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentUser: 'fetchCurrentUser'
    }),
    ...mapMutations({
      resetCurrent: 'RESET_CURRENT_USER'
    }),
    async setUser () {
      if (this.user.id !== this.id) {
        await this.fetchCurrentUser(this.id)
      }
    }
  },
  created () {
    this.setUser().then(() => {
      document.title = this.user.first_name + '  ' + this.user.last_name
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
