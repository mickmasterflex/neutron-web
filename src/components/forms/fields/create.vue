<template>
  <div>
    <button class="btn btn-green" @click="toggleShowCreateForm(true)" v-show="!showCreateForm">Add Field</button>
    <validation-observer v-slot="{ handleSubmit }" ref="form" v-show="showCreateForm">
      <form @submit.prevent="handleSubmit(submitForm)">
        <v-select-field rules="required" v-model="baseField" field_label="Choose Base Field" :options="baseFields"></v-select-field>
        <button type="submit" class="btn btn-green mt-5">Select Field</button><span class="text-link" @click="toggleShowCreateForm(false)">Close</span>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      baseField: ''
    }
  },
  computed: {
    ...mapGetters({
      baseFields: 'getBaseFields',
      showCreateForm: 'getShowCreateTextField',
      form: 'getCurrentForm'
    })
  },
  methods: {
    ...mapActions({
      create: 'createTextField',
      fetchBaseFields: 'fetchBaseFields'
    }),
    ...mapMutations({
      toggleShowCreateForm: 'TOGGLE_SHOW_CREATE_TEXT_FIELD'
    }),
    submitForm () {
      this.create({
        form: this.form.id,
        base_field: this.baseField
      })
    }
  },
  created () {
    this.fetchBaseFields()
  }
}
</script>
