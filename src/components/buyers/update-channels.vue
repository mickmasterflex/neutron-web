<template>
  <panel-template title="Active Channels" :actionTransition="true" :loading="loading">
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
    ...mapMutations({
      setChannelsFetchLoading: 'SET_CHANNELS_FETCH_LOADING'
    }),
    setChannels () {
      this.channels = this.buyer.channels
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          const updatedBuyer = this.buyer
          updatedBuyer.channels = this.channels
          this.update(updatedBuyer).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  watch: {
    buyer: function () {
      this.setChannels()
    }
  },
  created () {
    this.setChannels()
    this.fetchChannels()
    this.setChannelsFetchLoading()
  },
  computed: {
    ...mapGetters({
      siblings: 'getBuyerSiblings',
      available_channels: 'getAllChannels',
      loading: 'getChannelsFetchLoading'
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
