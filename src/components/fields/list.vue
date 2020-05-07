<template>
  <div>
    <h2>Contract Form</h2>
    <table v-if="form.fields">
      <tr>
        <th class="th">ID</th>
        <th class="th">Label</th>
        <th class="th"></th>
      </tr>
      <tr v-for="field in form.fields" :key="field.id">
        <td>{{field.id}}</td>
        <td>{{field.label}}</td>
        <td><button class="btn btn-circle btn-o-blue" @click="editTextField(field.id)">e</button></td>
      </tr>
    </table>
    <div v-else>
      No Fields
    </div>
    <update-text-field :field="this.currentTextField"></update-text-field>
  </div>
</template>

<script>
import updateTextField from '@/components/fields/text-fields/update'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    form: Object
  },
  components: {
    'update-text-field': updateTextField
  },
  methods: {
    ...mapActions(['fetchCurrentTextField']),
    editTextField (id) {
      this.fetchCurrentTextField(id)
    }
  },
  computed: {
    ...mapGetters({ currentTextField: 'getCurrentTextField' })
  }
}
</script>
