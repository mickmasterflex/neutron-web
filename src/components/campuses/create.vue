<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Campus</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Campus Name"></v-text-field>
          <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
          <div class="field-group">
            <label class="field-label">Online</label>
            <check-switch field_id="is_online" v-model="is_online"></check-switch>
          </div>
          <text-field v-model="address1" field_id="address1" field_label="Address1"></text-field>
          <text-field v-model="address2" field_id="address2" field_label="Address2"></text-field>
          <text-field v-model="city" field_id="city" field_label="City"></text-field>
          <select-field v-model="state" field_id="state" field_label="State" :options="formatListForSelectOptions(states)"></select-field>
          <text-field v-model="postal_code" field_id="postal_code" field_label="Postal Code"></text-field>
          <select-field v-model="phone_type" :options="formatListForSelectOptions(phoneTypes)" field_id="createPhoneType" field_label="Type"></select-field>
          <text-field v-model="phone_number" field_id="phone_number" field_label="Phone Number"></text-field>
          <text-field v-model="phone_extension" field_id="phone_extension" field_label="Phone Extension"></text-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">Create Campus</button>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { enterKeyListener } from '@/mixins/enter-key-listener'
import { setResponseErrors } from '@/mixins/set-response-errors'
import formatList from '@/mixins/format-list-for-select-options'

export default {
  data () {
    return {
      name: '',
      short_description: '',
      is_online: false,
      address1: '',
      address2: '',
      city: '',
      state: '',
      postal_code: '',
      phone_type: '',
      phone_number: '',
      phone_extension: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateCampusModal',
      phoneTypes: 'getPhoneTypes',
      states: 'getStatesAbbreviated'
    })
  },
  props: {
    brandId: {
      type: Number,
      required: true
    }
  },
  mixins: [enterKeyListener, setResponseErrors, formatList],
  methods: {
    ...mapActions({
      create: 'createCampus'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_CAMPUS_MODAL'
    }),
    close () {
      this.name = ''
      this.short_description = ''
      this.is_online = ''
      this.address1 = ''
      this.address2 = ''
      this.city = ''
      this.state = ''
      this.postal_code = ''
      this.phone_type = ''
      this.phone_number = ''
      this.phone_extension = ''
      this.description = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            name: this.name,
            short_description: this.short_description,
            vertical: 'education',
            is_online: this.is_online,
            address1: this.address1,
            address2: this.address2,
            city: this.city,
            state: this.state,
            postal_code: this.postal_code,
            phone_type: this.phone_type,
            phone_number: this.phone_number,
            phone_extension: this.phone_extension,
            description: this.description,
            brand: this.brandId
          }).then(() => {
            this.close()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
