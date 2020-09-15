<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Buyer Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm" class="form-horizontal">
      <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
    </form>
  </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Buyer Contract</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enterKeyListener'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      name: ''
    }
  },
  props: {
    client: {
      type: Number
    },
    buyerContracts: {
      type: Array
    },
    parent: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateBuyerModal'
    })
  },
  mixins: [enterKeyListener, setResponseErrors],
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_BUYER_MODAL'
    }),
    ...mapActions({
      create: 'createBuyer'
    }),
    close () {
      this.name = ''
      this.parent = ''
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
            parent: this.parent,
            client: this.$props.client
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
