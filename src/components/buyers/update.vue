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
          <div class="field-group">
            <label for="">Allowed Channels</label>
            <multiselect class="base-field relative" :multiple="true" v-model="channels" :options="available_channels" track-by="id">
              <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
              <template slot="caret">
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </span>
              </template>
            </multiselect>
          </div>
          <ul class="list-none well ml-label-width"><li v-for="channel in channels" :key="channel.id">{{ channel.name }}</li></ul>
        </form>
      </validation-observer>
    </template>
  </panel-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/set-response-errors'
import Multiselect from 'vue-multiselect'

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
  components: { Multiselect }
}
</script>
