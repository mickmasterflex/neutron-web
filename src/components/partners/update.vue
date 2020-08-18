<template>
  <form-panel title="Edit Partner" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          <select-field v-model="parent" :options="siblings" field_id="parent" field_label="Parent"></select-field>
        </form>
      </validation-observer>
    </template>
  </form-panel>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      name: '',
      parent: ''
    }
  },
  props: {
    partner: Object
  },
  watch: {
    partner: function () {
      this.setPartner()
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({ update: 'updatePartner' }),
    setPartner () {
      this.name = this.partner.name
      this.parent = this.partner.parent
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            parent: this.parent,
            client: this.partner.client,
            id: this.partner.id
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  created () {
    this.setPartner()
  },
  computed: {
    ...mapGetters({
      siblings: 'getPartnerSiblings'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.partner.name || this.parent !== this.partner.parent
      } else {
        return false
      }
    }
  }
}
</script>
