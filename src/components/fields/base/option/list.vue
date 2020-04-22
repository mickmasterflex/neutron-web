<template>
  <div>
    <table v-if="baseOptionFields" class="w-full">
      <tr class="th-row">
        <th class="th">Name</th>
        <th class="th">Label</th>
        <th class="th">Description</th>
        <th class="th">Type</th>
      </tr>
      <tr v-for="field in baseOptionFields" :key="field.id">
        <td class="td">{{field.name}}</td>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      baseOptionFields: 'getBaseOptionFields'
    })
  },
  methods: {
    ...mapActions({
      fetchFields: 'fetchBaseOptionFields'
    })
  },
  created () {
    this.fetchFields()
  }
}
</script>
