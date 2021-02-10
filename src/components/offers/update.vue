<template>
  <panel-template title="Edit Offer" :actionTransition="true" :showLoader="loading" :loadingText="loadingText">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Offer Name"></v-text-field>
          <v-select-field v-model="status" rules="required" :options="formatListForSelectOptions(statuses)" field_id="status" field_label="Status"></v-select-field>
<!--          <select-product v-model="product" rules="required"></select-product>-->
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import formatList from '@/mixins/format-list-for-select-options'
// import selectProduct from '@/components/products/select'

export default {
  data () {
    return {
      name: '',
      // product: '',
      status: undefined
    }
  },
  props: {
    offer: Object
  },
  watch: {
    offer: function () {
      this.setOffer()
    }
  },
  methods: {
    ...mapActions({
      update: 'updateOffer'
    }),
    setOffer () {
      this.name = this.offer.name
      // this.product = this.offer.product
      this.status = this.offer.status
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            id: this.offer.id,
            name: this.name,
            contract: this.offer.contract,
            status: this.status,
            // product: this.product,
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
      statuses: 'getAllContractStatuses',
      // products: 'getAllProducts',
      loading: 'getOfferFetchLoading',
      loadingText: 'getOfferFetchLoadingText'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.offer.name || this.status !== this.offer.status
      } else {
        return false
      }
    }
  },
  created () {
    this.setOffer()
  },
  mixins: [formatList, setResponseErrors],
  components: {
    // 'select-product': selectProduct
  }
}
</script>
