<template>
  <panel-template
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
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>
