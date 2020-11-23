<template>
  <div>
    <table v-if="baseFields" class="table table-striped">
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
          <td class="td">
            <span class="text-link"
              @click="editBaseField(field.id, field.type)">
              {{field.label}}</span>
          </td>
          <td class="td">{{field.name}}</td>
          <td class="td">{{field.description}}</td>
          <td class="td">{{field.type}}</td>
          <td class="td">
            <span class="flex flex-row justify-end">
              <delete-base-field :id="field.id" :type="field.type" v-if="field.type"></delete-base-field>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteBaseField from '@/components/forms/base-fields/delete'

export default {
  components: {
    'delete-base-field': deleteBaseField
  },
  computed: {
    ...mapGetters({
      baseFields: 'getBaseFields'
    })
  },
  methods: {
    ...mapActions({
      fetchCurrentBaseOptionField: 'fetchCurrentBaseOptionField',
      fetchCurrentBaseTextField: 'fetchCurrentBaseTextField'
    }),
    editBaseField (id, type) {
      if (type === 'text' || type === 'textarea') {
        this.editBaseTextField(id)
      } else {
        this.editBaseOptionField(id)
      }
    },
    editBaseTextField (id) {
      this.fetchCurrentBaseTextField(id)
    },
    editBaseOptionField (id) {
      this.fetchCurrentBaseOptionField(id)
    }
  }
}
</script>
