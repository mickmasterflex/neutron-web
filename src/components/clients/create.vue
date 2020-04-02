<template>
  <form @submit.prevent="createClient">
    <label for="name">Client Name</label>
    <input type="text" v-model="name" id="name" class="base-field" required>
    <label for="slug">Slug</label>
    <input type="text" v-model="slug" id="slug" class="base-field" required>
    <button type="submit" class="btn btn-green mt-5">Submit</button>
  </form>
</template>

<script>
import axios from '../../axios'

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
          console.log(response)
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
