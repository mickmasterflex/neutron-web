<template>
  <check-switch
    :field_id="`altId-` + altId.id"
    :value="altId.enabled"
    off_color="gray"
    :disabled="loading"
    @input="updateEnabledStatus({
      alternate_id: altId.id,
      enabled: $event
    })"
  >
    <template #switch-on>
      <font-awesome-icon icon="spinner" pulse v-if="loading && altId.enabled"></font-awesome-icon>
    </template>
    <template #switch-off>
      <font-awesome-icon icon="spinner" pulse v-if="loading && !altId.enabled"></font-awesome-icon>
    </template>
  </check-switch>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    altId: Object
  },
  methods: {
    ...mapActions({
      updateAlternateId: 'updateAlternateIdStatus'
    }),
    async updateEnabledStatus (e) {
      this.loading = true
      await this.updateAlternateId(e)
        .finally(() => { this.loading = false })
    }
  }
}
</script>
