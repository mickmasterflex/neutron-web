<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Client Name"></v-text-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      name: ''
    }
  },
  props: {
    client: Object
  },
  watch: {
    client: function () {
      this.name = this.client.name
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateClient'
    }),
    submitForm () {
      this.update({
        name: this.name,
        slug: this.client.slug,
        id: this.client.id
      }).catch(error => {
        this.error = error
      })
    }
  }
}
</script>
