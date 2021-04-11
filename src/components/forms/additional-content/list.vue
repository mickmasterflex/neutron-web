<template>
  <div class="space-y-2" v-if="contentExists">
    <list-item
      v-for="content in form.additional_form_content_tcpa"
      :key="`additionalContent-${content.id}`"
      :content="content"
    />
  </div>
  <table-empty-state v-else
                     heading="No content has been added"
                     copy="Use the Add Content button to get started."></table-empty-state>
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
    }),
    contentExists () {
      return this.form.additional_form_content_tcpa ? this.form.additional_form_content_tcpa.length > 0 : null
    }
  }
}
</script>
