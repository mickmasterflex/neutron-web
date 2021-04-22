<template>
  <transition-table-state>
    <table v-if="baseFields.length" class="table table-striped">
      <thead>
        <tr>
          <th class="th">Label</th>
          <th class="th">Name</th>
          <th class="th">Description</th>
          <th class="th">Type</th>
          <th class="th"></th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr class="tr" v-for="field in baseFields" :key="field.id">
          <td class="td font-bold">{{field.label}}</td>
          <td class="td">{{field.name}}</td>
          <td class="td">{{field.description}}</td>
          <td class="td">{{field.type}}</td>
          <td class="td">
            <btn-group-right>
              <delete-base-field :id="field.id" :type="field.type" v-if="field.type"></delete-base-field>
              <button class="btn btn-circle btn-hollow-blue mr-1"
                      @click="editBaseField(field)">
                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
              </button>
            </btn-group-right>
          </td>
        </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       heading="No Base Fields Exist"
                       key="empty"
                       copy="Use the 'New Field' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import deleteBaseField from '@/components/forms/base-fields/delete'

export default {
  components: {
    'delete-base-field': deleteBaseField
  },
  computed: {
    ...mapGetters({
      baseFields: 'getBaseFields',
      baseOptionFieldTypes: 'getBaseOptionFieldTypes'
    })
  },
  methods: {
    ...mapMutations({
      setCurrentBaseField: 'SET_CURRENT_BASE_FIELD',
      setCurrentBaseOptions: 'SET_CURRENT_BASE_OPTIONS',
      sortCurrentBaseOptions: 'SORT_CURRENT_BASE_OPTIONS'
    }),
    editBaseField (field) {
      this.setCurrentBaseField(field)
      if (this.baseOptionFieldTypes.includes(field.type)) {
        this.setCurrentBaseOptions(field.base_options)
        this.sortCurrentBaseOptions()
      }
    }
  }
}
</script>
