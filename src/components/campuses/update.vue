<template>
  <validation-observer v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="name" rules="required" field_id="campusName" field_label="Campus Name"></v-text-field>
      <textarea-field v-model="short_description" field_id="short_description" field_label="Short Description"></textarea-field>
      <v-select-field v-model="vertical" :options="verticalOptions" rules="required" field_id="vertical" field_label="Vertical"></v-select-field>
      <checkbox-single v-model="is_online" field_id="checkbox" field_label="Online"/>
      <text-field v-model="address1" field_id="address1" field_label="Address1"></text-field>
      <text-field v-model="address2" field_id="address2" field_label="Address2"></text-field>
      <text-field v-model="city" field_id="city" field_label="City"></text-field>
      <text-field v-model="state" field_id="state" field_label="State"></text-field>
      <text-field v-model="postal_code" field_id="postal_code" field_label="Postal Code"></text-field>
      <select-field v-model="phone_type" :options="typeOptions" field_id="createPhoneType" field_label="Type"></select-field>
      <v-text-field v-model="phone_number" field_id="phone_number" rules="required" field_label="Phone Number"></v-text-field>
      <text-field v-model="phone_extension" field_id="phone_extension" field_label="Phone Extension"></text-field>
      <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
      <button type="submit" class="btn btn-green mt-5">Submit</button>
    </form>
  </validation-observer>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      name: '',
      short_description: '',
      vertical: '',
      is_online: '',
      verticalOptions: {
        education: { name: 'education', id: 'education' }
      },
      address1: '',
      address2: '',
      city: '',
      state: '',
      postal_code: '',
      phone_type: '',
      typeOptions: {
        home: { name: 'home', id: 'home' },
        work: { name: 'work', id: 'work' },
        mobile: { name: 'mobile', id: 'mobile' },
        fax: { name: 'fax', id: 'fax' }
      },
      phone_number: '',
      phone_extension: '',
      description: ''
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
      this.is_online = this.campus.is_online
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
        brand: this.brand,
        id: this.campus.id
      })
    }
  }
}
</script>