<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="clientName" field_label="Client Name"></v-text-field>
      <v-text-field v-model="slug" rules="required|alpha_dash" field_id="clientSlug" field_label="Slug"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

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
  methods: {
    ...mapActions({
      update: 'updateClient'
    }),
    submitForm () {
      this.update({
        name: this.name,
        slug: this.slug,
        id: this.client.id
      })
    }
  }
}
</script>
