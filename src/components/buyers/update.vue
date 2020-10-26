<template>
  <panel-template title="Edit Buyer" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
          <select-field v-model="parent" :options="siblings" field_id="parent" field_label="Parent"></select-field>
          <v-select-field v-model="status" rules="required" :options="statusOptions" field_id="status" field_label="Status"></v-select-field>
          <v-text-field v-model="rpl" rules="dollar_amount" field_id="rpl" field_label="Revenue Per Lead"></v-text-field>
          <date-picker v-model="scheduledStart" rules="date" field_id="date" field_label="Scheduled Start"></date-picker>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import datePicker from '@/components/ui/forms/validation-fields/date-picker'

import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      parent: '',
      rpl: undefined,
      status: undefined,
      statusOptions: {
        active: { name: 'Active', id: 'active' },
        paused: { name: 'Paused', id: 'paused' },
        archived: { name: 'Archived', id: 'archived' },
        terminated: { name: 'Terminated', id: 'terminated' }
      },
      scheduledStart: null
    }
  },
  props: {
    buyer: Object
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateBuyer'
    }),
    setBuyer () {
      this.name = this.buyer.name
      this.parent = this.buyer.parent
      this.status = this.buyer.status
      this.rpl = this.buyer.rpl
      this.scheduledStart = this.buyer.scheduled_start
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            parent: this.parent,
            client: this.buyer.client,
            id: this.buyer.id,
            rpl: this.rpl,
            status: this.status,
            scheduled_start: this.scheduledStart
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  watch: {
    buyer: function () {
      this.setBuyer()
    }
  },
  created () {
    this.setBuyer()
  },
  computed: {
    ...mapGetters({
      siblings: 'getBuyerSiblings'
    }),
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.buyer.name ||
          this.parent !== this.buyer.parent ||
          this.rpl !== this.buyer.rpl ||
          this.status !== this.buyer.status ||
          this.scheduledStart !== this.buyer.scheduled_start
      } else {
        return false
      }
    }
  },
  components: {
    'date-picker': datePicker
  }
}
</script>
