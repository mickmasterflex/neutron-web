<template>
  <panel-template title="Edit Client" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Client Name"></v-text-field>
        </form>
      </validation-observer>
    </template>
  </panel-template>
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
  computed: {
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.client.name
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
            slug: this.client.slug,
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
