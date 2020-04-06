<template>
  <form @submit.prevent="updateClient">
    <text-field-stacked v-model="name" field_id="clientName" label="Client Name" :required="true"></text-field-stacked>
    <text-field-stacked v-model="slug" field_id="clientSlug" label="Slug" :required="true"></text-field-stacked>
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
