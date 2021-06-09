<template>
  <panel-template title="Edit Buyer" :actionTransition="true" v-bind="$attrs">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required|standard_chars" field_id="name" field_label="Name"></v-text-field>
          <parent-select v-model="parent" contract-type="buyer" ref="parentSelect"></parent-select>
          <v-select-field v-model="status" rules="required" :options="formatListForSelectOptions(statuses)" field_id="status" field_label="Status"></v-select-field>
          <date-picker v-model="activateAt" v-if="status !== 'active'" field_id="activate_at" field_label="Activate At" mode="dateTime"></date-picker>
          <v-text-field v-model="rpl" rules="dollar_amount|required" field_id="rpl" field_label="Revenue Per Lead"></v-text-field>
          <select-vertical v-model="vertical"/>
          <buyer-group-field :buyer="buyer"></buyer-group-field>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import datePicker from '@/components/ui/forms/validation-fields/date-picker'
import buyerGroupField from '@/components/buyer-groups/buyer-group-field'
import parentSelect from '@/components/contracts/parent-select'
import { mapActions, mapGetters } from 'vuex'
import formatList from '@/mixins/format-list-for-select-options'
import { setResponseErrors } from '@/mixins/set-response-errors'
import selectVertical from '@/components/verticals/select'

export default {
  data () {
    return {
      name: '',
      parent: '',
      rpl: undefined,
      status: undefined,
      buyerGroup: undefined,
      activateAt: null,
      client: null,
      vertical: null
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
      this.vertical = this.buyer.vertical
      this.activateAt = this.buyer.activate_at
      this.client = this.buyer.client
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            parent: this.parent,
            client: this.client,
            id: this.buyer.id,
            rpl: this.rpl,
            buyer_group: this.buyerGroup,
            vertical: this.vertical,
            status: this.status,
            activate_at: this.status !== 'active' ? this.activateAt : null
          }).then(() => {
            this.$refs.parentSelect.generateTree()
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
          this.activateAt !== this.buyer.activate_at ||
          this.buyerGroup !== this.buyer.buyer_group ||
          this.vertical !== this.buyer.vertical
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
    'parent-select': parentSelect,
    'select-vertical': selectVertical
  }
}
</script>
