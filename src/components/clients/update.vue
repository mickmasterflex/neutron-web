<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Client Name"></v-text-field>
      <v-text-field v-model="slug" rules="required|alpha_dash" field_id="slug" field_label="Slug"></v-text-field>
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
      name: '',
      slug: ''
    }
  },
  props: {
    client: Object
  },
  watch: {
    client: function () {
      this.name = this.client.name
      this.slug = this.client.slug
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateClient'
    }),
    submitForm () {
      this.update({
        name: this.name,
        slug: this.slug,
        id: this.client.id
      }).catch(error => {
        this.error = error
      })
    }
  }
}
</script>
