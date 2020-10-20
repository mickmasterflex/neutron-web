<template>
  <panel-template title="Edit Buyer" :actionTransition="true">
    <template v-slot:action>
      <button @click="submitForm" class="btn btn-green" v-show="unsavedChanges">Save Changes</button>
    </template>
    <template v-slot:content>
      <validation-observer ref="form" class="form-horizontal">
        <form @submit.prevent="submitForm">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          <select-field v-model="parent" :options="siblings" field_id="parent" field_label="Parent"></select-field>
          <multiselect-switches :options="available_channels" v-model="channels" field_id="channels" field_label="Available Chans"></multiselect-switches>
          <ul class="list-none well ml-label-width"><li v-for="channel in channels" :key="channel">{{ channel }}</li></ul>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import multiselectSwitches from '@/components/ui/forms/validation-fields/multi-select'

export default {
  data () {
    return {
      name: '',
      parent: '',
      channels: '',
      available_channels: [
        {
          id: 1,
          name: 'Only The Best Powerlifters'
        },
        {
          id: 2,
          name: 'Swimmers'
        },
        {
          id: 3,
          name: 'Racers'
        }
      ]
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
      this.channels = this.buyer.channels
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name,
            parent: this.parent,
            channels: this.channels,
            client: this.buyer.client,
            id: this.buyer.id
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
        return this.name !== this.buyer.name || this.parent !== this.buyer.parent || this.channels !== this.buyer.channels
      } else {
        return false
      }
    }
  },
  components: {
    'multiselect-switches': multiselectSwitches
  }
}
</script>
