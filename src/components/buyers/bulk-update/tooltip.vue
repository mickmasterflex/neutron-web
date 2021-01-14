<template>
  <tooltip-dialog-template :buttonDisabled="selectedContracts.length === 0">
    <template v-slot:button-text>
      <font-awesome-icon icon="pencil-alt"></font-awesome-icon> Statuses
    </template>
    <template v-slot:header>
      {{selectedContracts.length}} Buyer Contracts Selected
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-select-field v-model="status" rules="required" :options="formatListForSelectOptions(statuses)" field_id="status" field_label="Status"></v-select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button
        class="btn btn-green w-48"
        @click="submitForm"
        :disabled="!status || selectedContracts.length === 0">Update Status
      </button>
    </template>
  </tooltip-dialog-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import formatList from '@/mixins/format-list-for-select-options'

export default {
  data () {
    return {
      status: ''
    }
  },
  computed: {
    ...mapGetters({
      statuses: 'getContractStatuses',
      selectedContracts: 'getBulkUpdateBuyers'
    })
  },
  methods: {
    ...mapActions({
      updateStatuses: 'bulkUpdateBuyerStatus'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateStatuses(this.status)
            .then(() => {})
        }
      })
    }
  },
  mixins: [formatList]
}
</script>
