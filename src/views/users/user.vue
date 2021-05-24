<template>
  <content-layout v-if="user">
    <template v-slot:hud-content>
      <div>
        <h1 class="h1 text-white">{{user.first_name}} {{user.last_name}}</h1>
        <p class="text-white">{{user.email}}</p>
      </div>
      <hud-stat-cards>
        <stat-card :data="user.id" title="User ID" key="userId"></stat-card>
      </hud-stat-cards>
    </template>
    <template v-slot:content>
      <base-panel-grid>
        <update-user :disabled="true" :user="user" class="col-span-2 xl:col-span-1"></update-user>
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
      resetCurrent: 'RESET_CURRENT_USER',
      setBreadcrumbs: 'SET_CURRENT_BREADCRUMBS'
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
      this.setBreadcrumbs([
        { name: 'Users', text: 'All Users' },
        { name: 'User', text: this.user.first_name + ' ' + this.user.last_name, params: { id: this.id } }
      ])
    })
  },
  destroyed () {
    this.resetCurrent()
  }
}
</script>
