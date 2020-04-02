<template>
  <form @submit.prevent="updateClient">
    <text-field v-model="name" field_id="clientName" label="Client Name" :required="true"></text-field>
    <text-field v-model="slug" field_id="clientSlug" label="Slug" :required="true"></text-field>
    <button type="submit" class="btn btn-green mt-5">Submit</button>
  </form>
</template>

<script>
import axios from '../../axios'
import textField from '../utilities/forms/stacked/text_field'

export default {
  data () {
    return {
      name: '',
      slug: '',
      output: ''
    }
  },
  props: ['id'],
  components: {
    'text-field': textField
  },
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
