<template>
  <div>
    <table v-if="baseFields" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">Label</th>
        <th class="th">Description</th>
        <th class="th">Type</th>
        <th class="th"></th>
      </tr>
      <tr v-for="field in baseFields" :key="field.id">
        <td class="td">
          <span class="text-link"
            @click="field.type === `text` || field.type === `textarea` ? editBaseTextField(field.id) : editBaseOptionField(field.id)">
            {{field.name}}</span>
        </td>
        <td class="td">{{field.label}}</td>
        <td class="td">{{field.description}}</td>
        <td class="td">{{field.type}}</td>
        <td class="td flex flex-row justify-end">
          <delete-base-text-field :id="field.id" v-if="field.type === `text` || field.type === `textarea`"></delete-base-text-field>
          <delete-base-option-field :id="field.id" v-if="field.type === `select` || field.type === `radio`"></delete-base-option-field>
        </td>
      </tr>
    </table>
    <div v-else>
      ...Loading...
    </div>
    <update-base-text-field-modal :field="currentBaseTextField" :show="showModalUpdateBaseTextField" @close="showModalUpdateBaseTextField=false"></update-base-text-field-modal>
    <update-base-option-field-modal :field="currentBaseOptionField" :show="showModalUpdateBaseOptionField" @close="showModalUpdateBaseOptionField=false"></update-base-option-field-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import updateBaseTextField from '@/components/fields/base/text-fields/update'
import deleteBaseTextField from '@/components/fields/base/text-fields/delete'
import updateBaseOptionField from '@/components/fields/base/option-fields/update'
import deleteBaseOptionField from '@/components/fields/base/option-fields/delete'

export default {
  data () {
    return {
      showModalUpdateBaseTextField: false,
      showModalUpdateBaseOptionField: false
    }
  },
  components: {
    'update-base-text-field-modal': updateBaseTextField,
    'update-base-option-field-modal': updateBaseOptionField,
    'delete-base-option-field': deleteBaseOptionField,
    'delete-base-text-field': deleteBaseTextField
  },
  computed: {
    ...mapGetters({
      baseFields: 'getBaseFields',
      currentBaseTextField: 'getCurrentBaseTextField',
      currentBaseOptionField: 'getCurrentBaseOptionField'
    })
  },
  methods: {
    ...mapActions({
      fetchBaseFields: 'fetchBaseFields',
      fetchCurrentBaseOptionField: 'fetchCurrentBaseOptionField',
      fetchCurrentBaseTextField: 'fetchCurrentBaseTextField'
    }),
    editBaseTextField (id) {
      this.showModalUpdateBaseTextField = true
      this.fetchCurrentBaseTextField(id)
    },
    editBaseOptionField (id) {
      this.showModalUpdateBaseOptionField = true
      this.fetchCurrentBaseOptionField(id)
    }
  },
  created () {
    this.fetchBaseFields()
  }
}
</script>
