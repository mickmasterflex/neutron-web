<template>
  <transition-table-state>
    <table v-if="injectedFieldTypes.length" class="table table-white">
      <thead>
      <tr>
        <th class="th">Type</th>
        <th class="th"></th>
      </tr>
      </thead>
<!--      <tbody class="tbody">-->
<!--      <tr class="tr" v-for="injectedFieldTypes in form.injected_field_types" :key="injectedFieldType.id">-->
<!--        <td class="td">{{ injectedFieldType.field_type }}</td>-->
<!--      </tr>-->
<!--      </tbody>-->
    </table>
    <table-empty-state v-else heading="None Added" copy="Use the 'Create a Injected Field' button."></table-empty-state>
  </transition-table-state>
</template>

<script>

import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapGetters({
      form: 'getCurrentForm'
    })
  },
  methods: {
    ...mapMutations({
      setCurrentInjectedFieldType: 'SET_CURRENT_INJECTED_FIELD_TYPE',
      showUpdateInjectedFieldTypeModal: 'SHOW_UPDATE_INJECTED_FIELD_TYPE_MODAL'
    })
  }
  //   setCurrentInjectedFieldTypeAndShow (injectedFieldType) {
  //     this.setCurrentInjectedField(injectedField)
  //     this.showUpdateInjectedFieldModal()
  //   }
  // }
}
</script>
