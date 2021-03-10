<template>
  <panel-template title="Lead Data">
    <template v-slot:action>
      <button class="btn btn-hollow-red"><font-awesome-icon icon="exclamation-triangle"></font-awesome-icon> Edit Lead Data</button>
    </template>
    <template v-slot:content>
      <div class="grid-cols-3 grid">
        <text-field v-for="(field, key) in lead.data" :value="field" :key="key" :field_label="key" field_disabled="disabled"></text-field>
      </div>
    </template>
  </panel-template>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      editable: false
    }
  },
  computed: {
    ...mapGetters({
      lead: 'getCurrentLead'
    })
  }
}
</script>
