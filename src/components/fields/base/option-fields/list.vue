<template>
  <div>
    <table v-if="baseOptionFields" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">Label</th>
        <th class="th">Description</th>
        <th class="th">Type</th>
        <th class="th"></th>
      </tr>
      <tr v-for="field in baseOptionFields" :key="field.id">
        <td class="td"><span @click="editField(field.id)" class="text-link">{{field.name}}</span></td>
        <td class="td">{{field.label}}</td>
        <td class="td">{{field.description}}</td>
        <td class="td">{{field.type}}</td>
        <td class="td flex flex-row justify-end"><delete-field :id="field.id"></delete-field></td>
      </tr>
    </table>
    <div v-else>
      ...Loading...
    </div>
    <update-base-option-field-modal :id="currentBaseOptionField.id" :show="showModalUpdateBaseOptionField" @close="showModalUpdateBaseOptionField=false"></update-base-option-field-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteField from '@/components/fields/base/option-fields/delete'
import updateField from '@/components/fields/base/option-fields/update'

export default {
  data () {
    return {
      showModalUpdateBaseOptionField: false
    }
  },
  components: {
    'update-base-option-field-modal': updateField,
    'delete-field': deleteField
  },
  computed: {
    ...mapGetters({
      baseOptionFields: 'getBaseOptionFields',
      currentBaseOptionField: 'getCurrentBaseOptionField'
    })
  },
  methods: {
    ...mapActions({
      fetchFields: 'fetchBaseOptionFields',
      fetchCurrentBaseOptionField: 'fetchCurrentBaseOptionField'
    }),
    editField (id) {
      this.showModalUpdateBaseOptionField = true
      this.fetchCurrentBaseOptionField(id)
    }
  },
  created () {
    this.fetchFields()
  }
}
</script>
