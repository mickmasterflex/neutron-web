<template>
  <panel-template title="Edit User" :actionTransition="true" :showLoader="loading" :loadingText="loadingText">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field :field_disabled="disabled" v-model="first_name" rules="required" field_id="first_name" field_label="First Name"></v-text-field>
          <v-text-field :field_disabled="disabled" v-model="last_name" rules="required" field_id="last_name" field_label="Last Name"></v-text-field>
          <v-text-field :field_disabled="disabled" v-model="email" rules="required|email" field_id="email" field_label="Email" field_type="email"></v-text-field>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: ''
    }
  },
  props: {
    user: Object,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    user () {
      this.setUser()
    }
  },
  created () {
    this.setUser()
  },
  computed: {
    ...mapGetters({
      loading: 'getUserFetchLoading',
      loadingText: 'getUserFetchLoadingText'
    }),
    unsavedChanges () {
      if (this.first_name) {
        return this.first_name !== this.user.first_name || this.last_name !== this.user.last_name || this.email !== this.user.email
      } else {
        return false
      }
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateUser'
    }),
    setUser () {
      this.first_name = this.user.first_name
      this.last_name = this.user.last_name
      this.email = this.user.email
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            id: this.user.id
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
