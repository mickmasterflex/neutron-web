<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Buyer Contract</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
          <v-select-field v-model="status" rules="required" :options="formatListForSelectOptions(statuses)" field_id="status" field_label="Status"></v-select-field>
          <date-picker v-model="activateAt" v-if="status !== 'active'" field_id="activate_at" field_label="Activate At" mode="dateTime"></date-picker>
          <v-text-field placeholder="5.99" v-model="rpl" rules="dollar_amount|required" field_id="rpl" field_label="Revenue Per Lead"></v-text-field>
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
import formatList from '@/mixins/format-list-for-select-options'

export default {
  data () {
    return {
      name: '',
      rpl: '0.00',
      status: 'active',
      buyerGroup: undefined,
      activateAt: null
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
      statuses: 'getNewContractStatuses',
      showModal: 'getShowCreateBuyerModal'
    })
  },
  methods: {
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_BUYER_MODAL'
    }),
    ...mapActions({
      create: 'createBuyer'
    }),
    close () {
      this.name = ''
      this.rpl = '0.00'
      this.status = 'active'
      this.activateAt = null
      this.buyerGroup = undefined
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
            buyer_group: this.buyerGroup,
            status: this.status,
            activate_at: this.activateAt
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
    'date-picker': datePicker
  }
}
</script>
