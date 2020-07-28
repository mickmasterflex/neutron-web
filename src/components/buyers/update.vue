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
    buyer: Object
  },
  watch: {
    buyer: function () {
      this.name = this.buyer.name
      this.parent = this.buyer.parent
    }
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateBuyer'
    }),
    submitForm () {
      this.update({
        name: this.name,
        parent: this.parent,
        client: this.buyer.client,
        id: this.buyer.id
      }).catch(error => {
        this.error = error
      })
    }
  },
  computed: {
    ...mapGetters({
      siblings: 'getBuyerSiblings'
    })
  }
}
</script>
