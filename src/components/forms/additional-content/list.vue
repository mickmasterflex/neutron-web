<template>
  <div class="space-y-2">
    <panel-template
      v-for="content in form.additional_form_content_tcpa"
      :key="`additionalContent-${content.id}`"
      :title="content.additional_content_type"
      contentBackgroundColor="white"
    >
      <template #content>
        <div class="space-x-4 mb-3">
          <span v-if="content.additional_content_type === 'tcpa'">
            Leadid Toggle: <span class="font-bold" :class="content.leadid_toggle ? 'text-green-600' : 'text-red-500'">{{ content.leadid_toggle }}</span>
          </span>
          <span>
            Double Opt-in: <span class="font-bold" :class="content.double_optin ? 'text-green-600' : 'text-red-500'">{{ content.double_optin }}</span>
          </span>
        </div>
        <div class="well">{{ content.additional_content_block }}</div>
      </template>
    </panel-template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      form: 'getCurrentForm'
    })
  }
}
</script>
