<template>
  <form @submit.prevent="createClient">
    <label for="name">Client Name</label>
    <input type="text" v-model="name" required id="name">
    <label for="slug">Slug</label>
    <input type="text" v-model="slug" required id="slug">
    <button type="submit" class="btn btn-green">Submit</button>
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
