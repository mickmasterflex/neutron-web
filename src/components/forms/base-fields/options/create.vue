<template>
  <tooltip-dialog-template button-color="green" :show="formVisible" @close="closeForm" @open="showForm">
    <template v-slot:button-text>
      <font-awesome-icon icon="plus"></font-awesome-icon>
      Add an Option
    </template>
    <template v-slot:header>
      Add an Option
    </template>
    <ul class="fields-inline-heading px-1">
      <li class="w-20 fields-inline-heading-item">Order</li>
      <li class="w-64 fields-inline-heading-item">Label</li>
      <li class="w-64 fields-inline-heading-item">Value</li>
    </ul>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitCreateForm">
          <v-text-field
            v-model="label"
            field_id="newOption_label"
            field_label="Label"
            rules="required"/>
          <v-text-field
            v-model="value"
            field_id="newOption_mapping"
            field_label="Value"
            rules="required"/>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitCreateForm()" class="btn btn-green">
        <font-awesome-icon icon="plus"></font-awesome-icon> Create
      </button>
    </template>
  </tooltip-dialog-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      label: '',
      value: '',
      formVisible: false
    }
  },
  computed: {
    ...mapGetters({
      fieldId: 'getCurrentBaseOptionsFieldId',
      options: 'getCurrentBaseOptions'
    }),
    order () {
      return this.options.length + 1
    }
  },
  methods: {
    ...mapActions({
      createOption: 'createBaseOption'
    }),
    showForm () {
      this.formVisible = true
    },
    closeForm () {
      this.formVisible = false
      this.label = ''
      this.value = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    submitCreateForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createOption({
            order: this.order,
            label: this.label,
            value: this.value,
            field: this.fieldId
          }).then(() => {
            this.closeForm()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
