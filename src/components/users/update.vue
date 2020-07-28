<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="first_name" rules="required" field_id="first_name" field_label="First Name"></v-text-field>
      <v-text-field v-model="last_name" rules="required" field_id="last_name" field_label="Last Name"></v-text-field>
      <v-text-field v-model="email" rules="required|email" field_id="email" field_label="Email" field_type="email"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: ''
    }
  },
  props: {
    user: Object
  },
  watch: {
    user: function () {
      this.first_name = this.user.first_name
      this.last_name = this.user.last_name
      this.email = this.user.email
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateUser'
    }),
    submitForm () {
      this.update({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        id: this.user.id
      }).catch(error => {
        this.error = error
      })
    }
  }
}
</script>
