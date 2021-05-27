<template>
  <transition-table-state>
    <table v-if="usedBaseFields.length" class="table table-striped">
      <thead>
      <tr>
        <th class="th">ID</th>
        <th class="th">Name</th>
        <th class="th">Type</th>
        <th class="th">Used By</th>
      </tr>
      </thead>
      <tbody class="tbody">
      <tr class="tr" v-for="usedBaseField in usedBaseFields" :key="usedBaseField">
        <td class="td">{{usedBaseField}}</td>
        <td class="td">{{baseField(usedBaseField).name}}</td>
        <td class="td">{{baseField(usedBaseField).type}}</td>
        <td class="td">{{usedBaseFieldFormsByUsedField(usedBaseField)}}</td>
      </tr>
      </tbody>
    </table>
    <table-empty-state v-else
                       class="well"
                       heading="No Used Base Fields Exist"
                       key="empty"
                       copy="Use the 'New Field' button to get started."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      usedBaseFields: 'getUsedBaseFields',
      usedBaseOptionFieldTypes: 'getBaseOptionFieldTypes',
      usedBaseFieldFormsByUsedField: 'getUsedBaseFieldFormsByUsedField',
      baseField: 'getBaseFieldById'
    })
  },
  methods: {
    ...mapMutations({
      setUsedBaseFieldS: 'SET_USED_BASE_FIELD'
    })
  }
}
</script>
