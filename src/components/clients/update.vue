<template>
  <div>
    <p class="bold">Edit Client</p>
    <form @submit.prevent="updateClient">
      <label for="name">Client Name</label>
      <input type="text" v-model="name" required id="name">
      <label for="slug">Slug</label>
      <input type="text" v-model="slug" required id="slug">
      <button type="submit" class="btn btn-green">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      apiBaseUrl: 'http://127.0.0.1:8000/api',
      name: '',
      slug: '',
      buyercontract_set: [],
      partnercontract_set: [],
      output: ''
    }
  },
  props: ['id'],
  methods: {
    updateClient () {
      axios.put(`${this.apiBaseUrl}/clients/${this.id}/`, {
        name: this.name,
        slug: this.slug,
        buyercontract_set: this.buyercontract_set,
        partnercontract_set: this.partnercontract_set
      })
        .then(response => {
          this.output = response
          console.log(response)
          this.$router.push({ name: 'Relationships' })
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
