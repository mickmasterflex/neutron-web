<template>
  <div>
    <div v-if="form">
      <div class="bg-gray-900 text-white rounded flex flex-row items-center">
        <span class="py-1 px-3">ID</span>
        <span class="py-1 px-3">Label</span>
        <span class="py-1 px-3">Mapping</span>
        <span class="py-1 px-3">Deliver</span>
      </div>
      <div v-for="field in form.fields" :key="field.id">
        <div :field="field" v-show="field.id!==currentTextFieldId" class="flex flex-row items-center">
          <text-field :value="field.id" disabled="disabled"/>
          <text-field :value="field.label" disabled="disabled"/>
          <text-field :value="field.mapping" disabled="disabled"/>
          <text-field :value="field.deliver" disabled="disabled"/>
          <delete-text-field :id="field.id"></delete-text-field>
          <button class="btn btn-circle btn-o-blue" @click="editTextField(field.id)">e</button>
        </div>
        <portal-target :name="`updateTextField--${field.id}`"></portal-target>
      </div>
    </div>
    <div v-else>
      No Fields
    </div>
    <portal v-if="currentTextField" :to="`updateTextField--${currentTextFieldId}`">
      <update-text-field :field="this.currentTextField" :form="form.id" v-show="showUpdateText"></update-text-field>
    </portal>
    <create-field :form="form.id" v-if="form" class="mt-5"></create-field>
  </div>
</template>

<script>
import updateTextField from '@/components/fields/text-fields/update'
import deleteTextField from '@/components/fields/text-fields/delete'
import createField from '@/components/fields/create'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      currentTextFieldId: {
        default: null,
        type: Number
      }
    }
  },
  components: {
    'delete-text-field': deleteTextField,
    'update-text-field': updateTextField,
    'create-field': createField
  },
  methods: {
    ...mapActions({
      fetchCurrentTextField: 'fetchCurrentTextField',
      fetchBaseFields: 'fetchBaseFields'
    }),
    ...mapMutations({
      toggleShowUpdateTextField: 'TOGGLE_SHOW_UPDATE_TEXT_FIELD'
    }),
    editTextField (id) {
      this.fetchCurrentTextField(id)
    }
  },
  computed: {
    ...mapGetters({
      currentTextField: 'getCurrentTextField',
      baseFields: 'getBaseFields',
      form: 'getCurrentForm',
      showUpdateText: 'getShowUpdateTextField'
    })
  },
  watch: {
    currentTextField () {
      this.toggleShowUpdateTextField(true)
      if (this.currentTextField) {
        this.currentTextFieldId = this.currentTextField.id
      } else {
        this.currentTextFieldId = null
      }
    }
  }
}
</script>
