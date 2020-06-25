<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Campus</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="name" rules="required" field_id="campusName" field_label="CampusName"></v-text-field>
          <textarea-field v-model="short_description" field_id="short_description" field_label="ShortDescription"></textarea-field>
          <v-select-field v-model="vertical" field_id="vertical" field_label="Vertical"></v-select-field>
          <v-text-field v-model="address1" rules="address1" field_id="address1" field_label="Address1"></v-text-field>
          <v-text-field v-model="address2" rules="address2" field_id="address2" field_label="Address2"></v-text-field>
          <v-text-field v-model="city" rules="city" field_id="city" field_label="City"></v-text-field>
          <v-text-field v-model="state" rules="state" field_id="state" field_label="State"></v-text-field>
          <v-text-field v-model="postal_code" rules="postal_code" field_id="postal_code" field_label="PostalCode"></v-text-field>
          <v-select-field v-model="phone_type" :options="options" rules="required" field_id="createPhoneType" field_label="PhoneType"></v-select-field>
          <v-text-field v-model="phone_number" rules="phone_number" field_id="phone_number" field_label="PhoneNumber"></v-text-field>
          <v-text-field v-model="phone_extension" rules="phone_extension" field_id="phone_extension" field_label="PhoneExtension"></v-text-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
          <select-field v-model="brand" :options="brand" field_id="brand" field_label="Brand"></select-field>
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
import { enterKeyListener } from '@/mixins/enterKeyListener'

export default {
  data () {
    return {
      name: '',
      short_description: '',
      vertical: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postal_code: '',
      phone_type: '',
      options: {
        home: { home: 'home', id: 'home' },
        work: { work: 'work', id: 'work' },
        mobile: { mobile: 'mobile', id: 'mobile' },
        fax: { fax: 'fax', id: 'fax' }
      },
      phone_number: '',
      phone_extension: '',
      description: '',
      brand: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateCampusModal'
    }),
    optionFieldSelected () {
      return this.type === 'home' || this.type === 'work' || this.type === 'mobile' || this.type === 'fax'
    }
  },
  props: {
    campuses: {
      type: Array
    },
    mixins: [enterKeyListener],
    methods: {
      ...mapActions({ create: 'createCampus' }),
      ...mapMutations({
        closeModal: 'CLOSE_CREATE_CAMPUS_MODAL'
      }),
      close () {
        this.name = ''
        this.short_description = ''
        this.vertical = ''
        this.address1 = ''
        this.address2 = ''
        this.city = ''
        this.state = ''
        this.postal_code = ''
        this.phone_type = ''
        this.phone_number = ''
        this.phone_extension = ''
        this.description = ''
        this.brand = ''
        this.$nextTick(() => {
          this.$refs.form.reset()
        })
        this.closeModal()
      },
      enterKeyAction () {
        if (this.showModal) {
          this.submitForm()
        }
      },
      submitForm () {
        this.$refs.form.validate().then(success => {
          if (success) {
            this.create({
              name: this.name,
              short_description: this.short_description,
              vertical: this.vertical,
              address1: this.address1,
              address2: this.address2,
              city: this.city,
              state: this.state,
              postal_code: this.postal_code,
              phone_type: this.phone_type,
              phone_number: this.phone_number,
              phone_extension: this.phone_extension,
              description: this.description,
              brand: this.brand
            }).then(() => {
              this.close()
            })
          }
        })
      }
    }
  }
}
</script>
