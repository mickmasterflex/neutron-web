<template>
  <tooltip-dialog-template
    :show="showTooltip"
    @close="close"
    @open="open"
    :buttonDisabled="selectedContracts.length === 0 || loading">
    <template v-slot:button-text>
      <font-awesome-icon icon="pencil-alt"></font-awesome-icon> Status
    </template>
    <template v-slot:header>
      {{selectedContracts.length}} {{ plural(type, selectedContracts.length) }} Selected
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
import { mapGetters } from 'vuex'
import formatList from '@/mixins/format-list-for-select-options'
import { plural } from '@/mixins/plural'

export default {
  data () {
    return {
      status: ''
    }
  },
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['buyer', 'partner', 'offer'].includes(value)
      }
    },
    open: {
      type: Function,
      required: true
    },
    close: {
      type: Function,
      required: true
    },
    updateStatuses: {
      type: Function,
      required: true
    },
    selectedContracts: {
      type: Array,
      required: true
    },
    showTooltip: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    selectedContracts () {
      if (this.showTooltip && this.selectedContracts.length === 0) {
        this.close()
      }
    }
  },
  computed: {
    ...mapGetters({
      statuses: 'getAllContractStatuses'
    })
  },
  methods: {
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
  mixins: [formatList, plural]
}
</script>
