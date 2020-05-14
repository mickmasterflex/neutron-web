<template>
  <div>
    <div v-if="form.fields">
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
    <create-field :form="form.id" ></create-field>
  </div>
</template>

<script>
import updateTextField from '@/components/fields/text-fields/update'
import deleteTextField from '@/components/fields/text-fields/delete'
import createField from '@/components/fields/create'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      showUpdateText: false,
      currentTextFieldId: {
        default: null,
        type: Number
      }
    }
  },
  props: {
    form: Object
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
    editTextField (id) {
      this.fetchCurrentTextField(id)
    }
  },
  computed: {
    ...mapGetters({
      currentTextField: 'getCurrentTextField',
      baseFields: 'getBaseFields'
    })
  },
  watch: {
    currentTextField () {
      this.showUpdateText = true
      if (this.currentTextField) {
        this.currentTextFieldId = this.currentTextField.id
      } else {
        this.currentTextFieldId = null
      }
    }
  }
}
</script>
