<template>
  <tooltip-dialog-template
    :show="showTooltip"
    @close="close"
    @open="open"
    :buttonDisabled="selectedContracts.length === 0 || loading">
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
        :disabled="!status || selectedContracts.length === 0">
        <span v-if="loading">
          <font-awesome-icon icon="spinner" pulse></font-awesome-icon> Loading
        </span>
        <span v-else>Update Status</span>
      </button>
    </template>
  </tooltip-dialog-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
      selectedContracts: 'getBulkUpdateBuyers',
      showTooltip: 'getShowBulkUpdateBuyerStatus',
      loading: 'getBulkUpdateBuyerStatusPostLoading'
    })
  },
  methods: {
    ...mapActions({
      updateStatuses: 'bulkUpdateBuyerStatus'
    }),
    ...mapMutations({
      close: 'CLOSE_BULK_UPDATE_BUYER_STATUS',
      open: 'SHOW_BULK_UPDATE_BUYER_STATUS'
    }),
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.updateStatuses(this.status)
            .then(() => {
              this.close()
            })
        }
      })
    }
  },
  mixins: [formatList]
}
</script>
