<template>
  <validation-observer v-slot="{ handleSubmit }" ref="form">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
      <select-field v-model="parent" :options="siblings" field_id="parent" field_label="Parent"></select-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
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
      this.name = this.partner.name
      this.parent = this.partner.parent
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({ update: 'updatePartner' }),
    submitForm () {
      this.update({
        name: this.name,
        parent: this.parent,
        client: this.partner.client,
        id: this.partner.id
      }).catch(error => {
        this.error = error
      })
    }
  },
  computed: {
    ...mapGetters({
      siblings: 'getPartnerSiblings'
    })
  }
}
</script>
