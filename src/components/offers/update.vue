<template>
  <form-panel title="Edit Offer" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Offer Name"></v-text-field>
          <v-select-field v-model="product" rules="required" :options="products" field_id="product" field_label="Product"></v-select-field>
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
      product: ''
    }
  },
  props: {
    offer: Object
  },
  mixins: [setResponseErrors],
  watch: {
    offer: function () {
      this.name = this.offer.name
      this.product = this.offer.product
    }
  },
  methods: {
    ...mapActions({
      update: 'updateOffer',
      fetchProducts: 'fetchProducts'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            id: this.offer.id,
            name: this.name,
            contract: this.offer.contract,
            product: this.product,
            client: this.offer.client
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      products: 'getAllProducts'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.offer.name || this.product !== this.offer.product
      } else {
        return false
      }
    }
  },
  created () {
    this.fetchProducts()
  }
}
</script>
