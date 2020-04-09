<template>
  <form @submit.prevent="createClient">
    <text-field v-model="name" rules="required" id="clientName" label="Client Name"></text-field>
    <text-field v-model="slug" rules="required" id="clientSlug" label="Slug"></text-field>
    <button type="submit" class="btn btn-green mt-5">Submit</button>
  </form>
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
