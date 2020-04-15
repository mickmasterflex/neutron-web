<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="partnerName" field_label="Name" class="field-group"></v-text-field>
      <select-field v-model="parent" :options="siblings" field_id="parent" field_label="Parent" class="field-group"></select-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      parent: ''
    }
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    client: {
      type: Number,
      default: null
    }
  },
  methods: {
    ...mapActions({ update: 'updatePartner' }),
    submitForm () {
      this.update({
        name: this.name,
        parent: this.parent,
        client: this.client,
        id: this.id
      })
    }
  },
  computed: { ...mapGetters({ siblings: 'getPartnerSiblings' }) }
}
</script>
