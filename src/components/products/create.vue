<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Product</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="partnerName" field_label="Name" class="field-group"></v-text-field>
          <text-feild v-model="short_description" field_id="shortDescription" field_label="Short Description" class="description"></text-feild>
          <select-field v-model="product_group" :options="product_group" field_id="product" field_label="Product" class="product-group"></select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Product</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'

export default {
  data () {
    return {
      name: '',
      short_description: '',
      product_group: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateProductModal'
    })
  },
  props: {
    client: {
      type: Number
    },
  mixins: [enterKeyListener],
  methods: {
    ...mapActions({
      create: 'createProduct'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_PRODUCT_MODAL'
    }),
    close () {
      this.name = ''
      this.short_description = ''
      this.product_group = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    enterKeyAction () {
      if (this.showModal) {
        this.submitForm()
      }
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            short_description: this.short_description,
            product_group: this.product_group
          }).then(() => {
            this.close()
          })
        }
      })
    }
  }
}
</script>
