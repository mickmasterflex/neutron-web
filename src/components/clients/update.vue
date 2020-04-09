<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(updateClient)">
      <v-text-field v-model="name" rules="required" id="clientName" label="Client Name"></v-text-field>
      <v-text-field v-model="slug" rules="required" id="clientSlug" label="Slug"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      name: '',
      slug: '',
      output: ''
    }
  },
  props: ['id'],
  methods: {
    updateClient () {
      axios.put(`/clients/${this.id}/`, {
        name: this.name,
        slug: this.slug
      })
        .then(response => {
          this.output = response
          this.$router.push({ name: 'Relationships' })
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
