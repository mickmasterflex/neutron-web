<template>
  <div class="space-y-2">
    <list-item
      v-for="content in form.additional_form_content_tcpa"
      :key="`additionalContent-${content.id}`"
      :content="content"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import listItem from './list-item'

export default {
  components: {
    'list-item': listItem
  },
  computed: {
    ...mapGetters({
      form: 'getCurrentForm'
    })
  }
}
</script>
