<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Offer Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm" class="form-horizontal">
      <select-product v-model="product_id" rules="required" @input="setOfferNameAsProductName($event)"></select-product>
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Offer Name"></v-text-field>
      <v-select-field v-model="status" rules="required" :options="formatListForSelectOptions(statuses)" field_id="status" field_label="Status"></v-select-field>
      <date-picker v-model="activateAt" v-if="status !== 'active'" field_id="activate_at" field_label="Activate At" mode="dateTime"></date-picker>
    </form>
  </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Offer</button>
    </template>
  </modal-template>
</template>
<script>
import datePicker from '@/components/ui/forms/validation-fields/date-picker'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'
import selectProduct from '@/components/products/select'
import formatList from '@/mixins/format-list-for-select-options'

export default {
  data () {
    return {
      name: '',
      status: 'active',
      product_id: null,
      activateAt: null
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateOfferModal',
      statuses: 'getNewContractStatuses',
      productById: 'getProductById'
    })
  },
  props: {
    buyer: Number,
    client: Number
  },
  methods: {
    ...mapActions({
      create: 'createOffer'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_OFFER_MODAL'
    }),
    setOfferNameAsProductName (id) {
      const product = this.productById(id)
      if (product && this.name === '') {
        this.name = product.name
      }
    },
    close () {
      this.name = ''
      this.parent = ''
      this.status = 'active'
      this.product_id = null
      this.activateAt = null
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            client: this.client,
            parent: this.buyer,
            status: this.status,
            activate_at: this.status !== 'active' ? this.activateAt : null,
            offer_data: {
              product_id: parseInt(this.product_id)
            }
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  mixins: [formatList, enterKeyListener, setResponseErrors],
  components: {
    'select-product': selectProduct,
    'date-picker': datePicker
  }
}
</script>
