<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(createClient)">
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
  methods: {
    createClient () {
      axios.post('/clients/', {
        name: this.name,
        slug: this.slug
      })
        .then(response => {
          this.output = response
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
