<template>
  <panel-template title="Alternate Ids" v-bind="$attrs">
    <template v-slot:content>
      <div class="form-horizontal" v-if="currentAltIds.length">
        <div class="field-group"
             v-for="altId in currentAltIds"
             :key="`altId-` + altId.id">
          <alt-id-switch :altId="altId"/>
          <label class="ml-4 text-left cursor-pointer" :for="`altId-` + altId.id">{{ altId.random_id }}</label>
        </div>
      </div>
      <table-empty-state v-else heading="No Alternate Ids assigned" copy="Alternate ids are generated once a partner is created. Reach out to a technical resource for assistance."/>
    </template>
  </panel-template>
</template>

<script>
import altIdSwitch from './alternate-id-switch'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      currentAltIds: 'getCurrentAlternateIds'
    })
  },
  components: {
    'alt-id-switch': altIdSwitch
  }
}
</script>
