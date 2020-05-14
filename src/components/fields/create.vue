<template>
  <div>
    <button class="btn btn-green" @click="showForm=true" v-show="!showForm">Add Field</button>
    <validation-observer v-slot="{ handleSubmit }" ref="form" v-show="showForm">
      <form @submit.prevent="handleSubmit(submitForm)">
        <v-select-field rules="required" v-model="baseField" field_label="Choose Base Field" :options="baseFields"></v-select-field>
        <button type="submit" class="btn btn-green mt-5">Select Field</button><span class="text-link" @click="showForm=false">Close</span>
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
      baseField: ''
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
        form: this.form,
        base_field: this.baseField
      })
    }
  },
  created () {
    this.fetchBaseFields()
  }
}
</script>
