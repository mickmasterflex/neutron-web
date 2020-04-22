<template>
  <div>
    <table v-if="baseTextFields" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">Label</th>
        <th class="th">Description</th>
        <th class="th">Type</th>
        <th class="th"></th>
      </tr>
      <tr v-for="field in baseTextFields" :key="field.id">
        <td class="td"><span @click="editField(field.id)" class="text-link">{{field.name}}</span></td>
        <td class="td">{{field.label}}</td>
        <td class="td">{{field.description}}</td>
        <td class="td">{{field.type}}</td>
        <td class="td flex flex-row content-end"><delete-field :id="field.id"></delete-field></td>
      </tr>
    </table>
    <div v-else>
      ...Loading...
    </div>
    <update-text-modal :id="currentField.id" :show="showModalUpdateBaseTextField" @close="showModalUpdateBaseTextField=false"></update-text-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import updateText from '@/components/fields/update'
import deleteField from '@/components/fields/delete'

export default {
  data () {
    return {
      field: null,
      showModalUpdateBaseTextField: false
    }
  },
  components: {
    'update-text-modal': updateText,
    'delete-field': deleteField
  },
  computed: {
    ...mapGetters({
      baseTextFields: 'getBaseTextFields',
      currentField: 'getCurrentBaseTextField'
    })
  },
  methods: {
    ...mapActions({
      fetchFields: 'fetchBaseTextFields',
      fetchCurrent: 'fetchCurrentBaseTextField'
    }),
    editField (id) {
      this.showModalUpdateBaseTextField = true
      this.fetchCurrent(id)
    }
  },
  created () {
    this.fetchFields()
  }
}
</script>
