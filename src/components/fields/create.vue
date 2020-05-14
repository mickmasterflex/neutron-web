<template>
  <div>
    <button class="btn btn-green" @click="showForm=true" v-show="!showForm">Add Field</button>
    <validation-observer v-slot="{ handleSubmit }" ref="form" v-show="showForm">
      <form @submit.prevent="handleSubmit(submitForm)">
      <v-text-field v-model="label" rules="required" field_label="Label" field_id="createFieldLabel" class="field-group"></v-text-field>
      <text-field v-model="mapping" field_label="Mapping" field_id="createFieldMapping" class="field-group"></text-field>
      <checkbox-single v-model="deliver" field_label="Deliver" field_id="createFieldDeliver" class="field-group"></checkbox-single>
      <v-select-field v-model="base_field" rules="required" field_label="Base Field" :options="baseFields"></v-select-field>
      <button type="submit" class="btn btn-green mt-5">Add Field</button><span class="text-link" @click="showForm=false">Close</span>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showForm: false,
      label: '',
      mapping: '',
      deliver: '',
      base_field: ''
    }
  },
  props: {
    form: Number
  },
  computed: {
    ...mapGetters({ baseFields: 'getBaseFields' })
  },
  methods: {
    ...mapActions({
      create: 'createTextField',
      fetchBaseFields: 'fetchBaseFields'
    }),
    submitForm () {
      this.create({
        label: this.label,
        mapping: this.mapping,
        deliver: this.deliver,
        form: this.form,
        base_field: this.base_field
      })
    }
  },
  created () {
    this.fetchBaseFields()
  }
}
</script>
