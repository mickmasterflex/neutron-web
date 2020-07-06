<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
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
      <select-field v-model="brand" :options="brands" field_id="brand" field_label="Brand"></select-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      phone_number: '',
      phone_extension: '',
      description: '',
      brand: ''
    }
  },
  props: {
    campus: Object
  },
  watch: {
    campus: function () {
      this.name = this.campus.name
      this.short_description = this.campus.short_description
      this.vertical = this.campus.vertical
      this.address1 = this.campus.address1
      this.address2 = this.campus.address2
      this.city = this.campus.city
      this.state = this.campus.state
      this.postal_code = this.campus.postal_code
      this.phone_type = this.campus.phone_type
      this.phone_number = this.campus.phone_number
      this.phone_extension = this.campus.phone_extension
      this.description = this.campus.description
      this.brand = this.campus.brand
    }
  },
  methods: {
    ...mapActions({
      update: 'updateCampus'
    }),
    submitForm () {
      this.update({
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
        brand: this.brand,
        id: this.campus.id
      })
    }
  },
  computed: {
    ...mapGetters({
      brands: 'getAllBrands'
    })
  }
}
</script>
