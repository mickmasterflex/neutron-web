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
      <update-user :user="currentActiveUser"></update-user>
    </template>
  </content-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import panelFooter from '@/components/ui/panels/base/footer'
import updateUser from '@/components/users/update'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      new_password: '',
      confirm_password: '',
      password_field_type: 'password',
      loading: false,
      passwordUnlocked: false
    }
  },
  computed: {
    ...mapGetters({
      currentActiveUser: 'getCurrentActiveUser',
      currentUser: 'getCurrentUser'
    })
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({ setPassword: 'resetPassword' }),
    togglePasswordUnlocked () {
      this.passwordUnlocked = !this.passwordUnlocked
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        this.loading = true
        if (success) {
          this.setPassword({
            new_password: this.new_password,
            confirm_password: this.confirm_password
          }).then(() => {
            this.togglePasswordUnlocked()
          })
            .catch(error => {
              this.error = error
            }).finally(() => {
              this.loading = false
            })
        }
      })
    }
  },
  components: {
    'panel-footer': panelFooter,
    'update-user': updateUser
  }
}
</script>
