<template>
  <panel-template title="Edit Buyer" :actionTransition="true" v-bind="$attrs">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
          <parent-select v-model="parent"></parent-select>
          <v-select-field v-model="status" rules="required" :options="formatListForSelectOptions(statuses)" field_id="status" field_label="Status"></v-select-field>
          <v-text-field v-model="rpl" rules="dollar_amount|required" field_id="rpl" field_label="Rev. Per Lead"></v-text-field>
          <buyer-group-field :buyer="buyer"></buyer-group-field>
          <date-picker v-model="scheduledStart" field_id="scheduled_start" field_label="Scheduled Start"></date-picker>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import datePicker from '@/components/ui/forms/validation-fields/date-picker'
import buyerGroupField from '@/components/buyer-groups/buyer-group-field'
import parentSelect from '@/components/buyers/parent-select'
import { mapActions, mapGetters } from 'vuex'
import formatList from '@/mixins/format-list-for-select-options'
import { setResponseErrors } from '@/mixins/set-response-errors'

export default {
  data () {
    return {
      name: '',
      parent: '',
      rpl: undefined,
      status: undefined,
      buyerGroup: undefined,
      scheduledStart: null,
      client: { id: null, name: null }
    }
  },
  props: {
    buyer: Object
  },
  methods: {
    ...mapActions({
      update: 'updateBuyer'
    }),
    setBuyer () {
      this.name = this.buyer.name
      this.parent = this.buyer.parent
      this.status = this.buyer.status
      this.rpl = this.buyer.rpl
      this.buyerGroup = this.buyer.buyer_group
      this.scheduledStart = this.buyer.scheduled_start
      this.client = this.buyer.client
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            parent: this.parent,
            client: this.client.id,
            id: this.buyer.id,
            rpl: this.rpl,
            buyer_group: this.buyerGroup,
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
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.buyer.name ||
          this.parent !== this.buyer.parent ||
          this.rpl !== this.buyer.rpl ||
          this.status !== this.buyer.status ||
          this.scheduledStart !== this.buyer.scheduled_start ||
          this.buyerGroup !== this.buyer.buyer_group
      } else {
        return false
      }
    },
    ...mapGetters({
      statuses: 'getAllContractStatuses'
    })
  },
  mixins: [formatList, setResponseErrors],
  components: {
    'date-picker': datePicker,
    'buyer-group-field': buyerGroupField,
    'parent-select': parentSelect
  }
}
</script>
