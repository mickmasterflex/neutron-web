<template>
  <transition-table-state>
    <table v-if="formInjectedFieldsExist || ancestorForms.length > 0" class="table table-white">
      <thead class="thead">
        <tr>
          <th class="th">Type</th>
          <th class="th">Key</th>
          <th class="th">Value</th>
          <th class="th">Params</th>
          <th class="th"></th>
        </tr>
      </thead>
      <tbody
        v-for="ancestorForm in ancestorForms"
        :key="`formInjectedFields-${ancestorForm.id}`"
      >
        <tr-th-section-heading :colspan="5">
          Inherited Fields From
          <router-link class="text-link" :to="{ name: 'BuyerContractFieldManagement', params: { client: currentClientData.slug, id: ancestorForm.buyer_contract } }">
            {{ ancestorName(ancestorForm.buyer_contract) }}
          </router-link>
        </tr-th-section-heading>
        <injected-tr
          v-for="(injectedField, index) in ancestorForm.injected_fields"
          :key="`inheritedinjected-${injectedField.id}`"
          :injected-field="injectedField"
          :class="index === 0 ? 'first-child': ''"
          :editable="false"
        ></injected-tr>
      </tbody>
      <tbody class="tbody">
        <tr-th-section-heading :colspan="5" v-if="ancestorForms.length && formInjectedFieldsExist">
          {{ contractName }} Injected Fields
        </tr-th-section-heading>
        <injected-tr
          v-for="(injectedField, index) in form.injected_fields"
          :key="`injected-${injectedField.id}`"
          :injected-field="injectedField"
          :class="index === 0 ? 'first-child': ''"
        ></injected-tr>
      </tbody>
    </table>
    <table-empty-state v-else heading="None Added" copy="Use the 'Add Injected Field' button."></table-empty-state>
  </transition-table-state>
</template>

<script>
import { mapGetters } from 'vuex'
import injectedTr from './tr'
import { ancestorName } from '@/mixins/ancestors/get-name'

export default {
  props: {
    contractName: String
  },
  components: {
    'injected-tr': injectedTr
  },
  mixins: [ancestorName],
  computed: {
    ...mapGetters({
      form: 'getCurrentForm',
      ancestorForms: 'getAncestorFormsWithInjectedFields',
      currentClientData: 'getCurrentClientData',
      getAncestorById: 'getAncestorById'
    }),
    formInjectedFieldsExist () {
      if (this.form.injected_fields) {
        return this.form.injected_fields.length
      } else {
        return 0
      }
    }
  }
}
</script>
