<template>
  <div class="space-y-2" v-if="contentExists || ancestorForms.length > 0">
    <div v-for="ancestorForm of ancestorForms" :key="`ancestorContentForm-${ancestorForm.id}`" class="space-y-2">
      <h5 class="h5 pt-3 pb-2">
        Inherited Content From
        <router-link class="text-link" :to="{ name: 'BuyerContractFieldManagement', params: { client: currentClientData.slug, id: ancestorForm.buyer_contract } }">
          {{ getAncestorById(ancestorForm.buyer_contract).name }}
        </router-link>
      </h5>
      <list-item
        v-for="content in ancestorForm.additional_form_content_tcpa"
        :key="`additionalAncestorContent-${content.id}`"
        :content="content"
        :editable="false"
      />
    </div>
    <h5 class="h5 pt-3 pb-2" v-if="contentExists && ancestorForms.length > 0">{{ contractName }} Content</h5>
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
  props: {
    contractName: String
  },
  components: {
    'list-item': listItem
  },
  computed: {
    ...mapGetters({
      form: 'getCurrentForm',
      currentClientData: 'getCurrentClientData',
      ancestorForms: 'getAncestorFormsWithAdditionalContent',
      getAncestorById: 'getAncestorById',
      getFormById: 'getFormById'
    }),
    contentExists () {
      return this.form.additional_form_content_tcpa ? this.form.additional_form_content_tcpa.length > 0 : null
    }
  }
}
</script>
