<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Buyer Contract</template>
    <template v-slot:body>
  <validation-observer ref="form">
    <form @submit.prevent="submitForm" class="form-horizontal">
      <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
      <v-select-field v-model="status" rules="required" :options="statusOptions" field_id="status" field_label="Status"></v-select-field>
      <v-text-field placeholder="5.99" v-model="rpl" rules="dollar_amount" field_id="rpl" field_label="Revenue Per Lead"></v-text-field>
      <date-picker @resetDate="scheduledStart = $event" v-model="scheduledStart" rules="date" field_id="date" field_label="Scheduled Start"></date-picker>
    </form>
  </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Buyer Contract</button>
    </template>
  </modal-template>
</template>

<script>
import datePicker from '@/components/ui/forms/validation-fields/date-picker'

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      rpl: undefined,
      status: undefined,
      statusOptions: {
        active: { name: 'Active', id: 'active' },
        paused: { name: 'Paused', id: 'paused' }
      },
      scheduledStart: null
    }
  },
  props: {
    client: {
      type: Number
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
      this.rpl = undefined
      this.status = undefined
      this.scheduledStart = null
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
            parent: this.parent,
            client: this.client,
            rpl: this.rpl,
            status: this.status,
            scheduled_start: this.scheduledStart
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  components: {
    'date-picker': datePicker
  }
}
</script>
