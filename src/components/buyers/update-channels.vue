<template>
  <panel-template title="Active Channels" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <multiselect-checkboxes v-if="buyer.channels" :options="available_channels" v-model="channels" field_id="channels"></multiselect-checkboxes>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import multiselectCheckboxes from '@/components/ui/forms/validation-fields/multi-select-switch.vue'

export default {
  data () {
    return {
      channels: []
    }
  },
  props: {
    buyer: Object
  },
  mixins: [setResponseErrors],
  methods: {
    ...mapActions({
      update: 'updateBuyer',
      fetchChannels: 'fetchChannels'
    }),
    setBuyer () {
      this.channels = this.buyer.channels
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.buyer.name,
            parent: this.buyer.parent,
            client: this.buyer.client,
            channels: this.channels,
            id: this.buyer.id,
            rpl: this.buyer.rpl,
            buyer_group: this.buyerGroup,
            status: this.buyer.status,
            scheduled_start: this.buyer.scheduledStart
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
    this.fetchChannels()
  },
  computed: {
    ...mapGetters({
      siblings: 'getBuyerSiblings',
      available_channels: 'getAllChannels'
    }),
    unsavedChanges () {
      if (this.channels) {
        return this.channels !== this.buyer.channels
      } else {
        return false
      }
    }
  },
  components: {
    'multiselect-checkboxes': multiselectCheckboxes
  }
}
</script>
