<template>
  <form @submit.prevent="createClient">
    <text-field v-model="name" :field_id="`clientName`" :label="`Client Name`" required="true"></text-field>
    <text-field v-model="slug" :field_id="`clientSlug`" :label="`Slug`" required="true"></text-field>
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
  components: {
    'text-field': textField
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
