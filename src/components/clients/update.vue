<template>
  <form-panel title="Edit Client" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Client Name"></v-text-field>
          <v-text-field v-model="slug" rules="required|alpha_dash" field_id="slug" field_label="Slug"></v-text-field>
        </form>
      </validation-observer>
    </template>
  </form-panel>
</template>

<script>
import { mapActions } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      name: '',
      slug: ''
    }
  },
  props: {
    client: Object
  },
  watch: {
    client: function () {
      this.name = this.client.name
      this.slug = this.client.slug
    }
  },
  computed: {
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.client.name || this.slug !== this.client.slug
      } else {
        return false
      }
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateClient'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            slug: this.slug,
            id: this.client.id
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
