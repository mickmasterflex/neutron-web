<template>
  <div>
    <table v-if="base_text_fields" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">Label</th>
        <th class="th">Description</th>
        <th class="th">Type</th>
      </tr>
      <tr v-for="field in base_text_fields" :key="field.id">
        <td class="td"><span @click="editField(field.id)" class="text-blue-500 underline cursor-pointer">{{field.name}}</span></td>
        <td class="td">{{field.label}}</td>
        <td class="td">{{field.description}}</td>
        <td class="td">{{field.type}}</td>
      </tr>
    </table>
    <div v-else>
      ...Loading...
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      field: null
    }
  },
  computed: {
    ...mapGetters({ base_text_fields: 'getBaseTextFields' })
  },
  methods: {
    ...mapActions({ fetchBaseTextFields: 'fetchBaseTextFields' }),
    ...mapGetters({ getBaseTextFieldById: 'getBaseTextFieldById' }),
    ...mapMutations({ showModal: 'showModal' }),
    editField (id) {
      this.showModal('updateText')
      this.getBaseTextFieldById(id)
    }
  },
  created () {
    this.fetchBaseTextFields()
  }
}
</script>
