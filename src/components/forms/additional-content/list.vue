<template>
  <div class="space-y-2" v-if="contentExists || ancestorForms.length > 0">
    <div class="space-y-2" v-for="ancestorForm in ancestorForms" :key="`contentForm-${ancestorForm.id}`">
      <list-item
        v-for="content in ancestorForm.additional_form_content_tcpa"
        :key="`additionalAncestorContent-${content.id}`"
        :content="content"
        :client-slug="clientSlug"
        :inherited-from="getAncestorById(ancestorForm.buyer_contract)"
      />
    </div>
    <list-item
      v-for="content in form.additional_form_content_tcpa"
      :key="`additionalContent-${content.id}`"
      :content="content"
      :client-slug="clientSlug"
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
  props: {
    clientSlug: String
  },
  components: {
    'list-item': listItem
  },
  computed: {
    ...mapGetters({
      form: 'getCurrentForm',
      ancestorForms: 'getAncestorFormsWithAdditionalContent',
      getAncestorById: 'getAncestorById'
    }),
    contentExists () {
      return this.form.additional_form_content_tcpa ? this.form.additional_form_content_tcpa.length > 0 : null
    }
  }
}
</script>
