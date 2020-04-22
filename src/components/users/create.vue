<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="first_name" rules="required" field_id="first_name" field_label="First Name" class="field-group"></v-text-field>
      <v-text-field v-model="last_name" rules="required" field_id="last_name" field_label="Last Name" class="field-group"></v-text-field>
      <v-text-field v-model="email" rules="required|email" field_id="email" field_label="Email" field_type="email" class="field-group"></v-text-field>
      <checkbox-single v-model="is_staff" field_id="is_staff" label="Staff"></checkbox-single>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      is_staff: ''
    }
  },
  methods: {
    ...mapActions({ create: 'createUser' }),
    submitForm () {
      this.create({
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        is_staff: this.is_staff
      })
    }
  }
}
</script>
