<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Update Base Text Field</template>
    <template v-slot:body>
      <validation-observer v-slot="{ handleSubmit }" ref="form">
        <form @submit.prevent="handleSubmit(submitForm)">
          <v-text-field v-model="name" rules="required" field_id="updateBaseTextFieldName" field_label="Name" class="field-group"></v-text-field>
          <v-text-field v-model="label" rules="required" field_id="updateBaseTextFieldLabel" field_label="Label" class="field-group"></v-text-field>
          <text-field v-model="desc" field_id="updateBaseTextFieldDesc" field_label="Description" class="field-group"></text-field>
          <v-select-field v-model="type" :options="typeOptions" rules="required" field_id="updateBaseTextFieldType" field_label="Type" class="field-group"></v-select-field>
          <button type="submit" class="btn btn-green mt-5">Update Field</button>
        </form>
      </validation-observer>
    </template>
  </modal-template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      name: '',
      label: '',
      desc: '',
      type: '',
      id: null,
      typeOptions: {
        text: { name: 'text', id: 'text' },
        textarea: { name: 'textarea', id: 'textarea' }
      }
    }
  },
  props: {
    show: Boolean,
    field: Object
  },
  watch: {
    field: function () {
      this.name = this.field.name
      this.label = this.field.label
      this.desc = this.field.description
      this.type = this.field.type
      this.id = this.field.id
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowUpdateBaseTextFieldModal'
    })
  },
  methods: {
    ...mapActions({
      update: 'updateBaseTextField'
    }),
    ...mapMutations({
      resetCurrentBaseTextField: 'RESET_CURRENT_BASE_TEXT_FIELD',
      closeModal: 'CLOSE_UPDATE_BASE_TEXT_FIELD_MODAL'
    }),
    close () {
      this.resetCurrentBaseTextField()
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.update({
        name: this.name,
        label: this.label,
        description: this.desc,
        type: this.type,
        id: this.id
      })
      this.close()
    }
  }
}
</script>
