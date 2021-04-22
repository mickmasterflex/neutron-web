<template>
  <modal-template :show="showModal" @close="close">
    <template v-slot:header>Create Base Field</template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm" class="form-horizontal">
          <v-text-field v-model="label" rules="required" field_id="label" field_label="Label"></v-text-field>
          <v-text-field v-model="name" rules="required" field_id="name" field_label="Name"></v-text-field>
          <textarea-field v-model="description" field_id="description" field_label="Description"></textarea-field>
          <v-select-field v-model="type" :options="formatListForSelectOptions(allBaseFieldTypeOptions)" rules="required" field_id="type" field_label="Type"></v-select-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-lg btn-green">
        <span v-if="optionFieldSelected">Create then add Options</span>
        <span v-else>Create Field</span>
      </button>
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
      label: '',
      description: '',
      type: ''
    }
  },
  computed: {
    ...mapGetters({
      showModal: 'getShowCreateBaseFieldModal',
      allBaseFieldTypeOptions: 'getAllBaseFieldTypes',
      baseBooleanFieldTypes: 'getBaseBooleanFieldTypes',
      baseOptionFieldTypes: 'getBaseOptionFieldTypes',
      baseTextFieldTypes: 'getBaseTextFieldTypes'
    }),
    booleanFieldSelected () {
      return this.baseBooleanFieldTypes.includes(this.type)
    },
    optionFieldSelected () {
      return this.baseOptionFieldTypes.includes(this.type)
    },
    textFieldSelected () {
      return this.baseTextFieldTypes.includes(this.type)
    }
  },
  mixins: [enterKeyListener, setResponseErrors, formatList],
  methods: {
    createField (data) {
      if (this.optionFieldSelected) {
        return this.createBaseOptionField(data)
      } else if (this.textFieldSelected) {
        return this.createBaseTextField(data)
      } else if (this.booleanFieldSelected) {
        return this.createBaseBooleanField(data)
      }
    },
    ...mapActions({
      createBaseOptionField: 'createBaseOptionField',
      createBaseTextField: 'createBaseTextField',
      createBaseBooleanField: 'createBaseBooleanField'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_CREATE_BASE_FIELD_MODAL'
    }),
    close () {
      this.name = ''
      this.label = ''
      this.description = ''
      this.type = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.closeModal()
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.createField({
            name: this.name,
            label: this.label,
            description: this.description,
            type: this.type
          }).then(() => { this.close() })
            .catch(error => { this.error = error })
        }
      })
    }
  }
}
</script>
