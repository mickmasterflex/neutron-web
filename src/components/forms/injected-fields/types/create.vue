<template>
  <tooltip-dialog-template button-color="turquoise" :show="formVisible" @close="closeForm" @open="showForm">
    <template v-slot:button-text>
      <font-awesome-icon icon="plus"></font-awesome-icon>
      Add Type
    </template>
    <template v-slot:header>
      Create Field Type
    </template>
    <template v-slot:body>
      <validation-observer ref="form">
        <form @submit.prevent="submitForm">
          <v-text-field
            rules="required"
            field_class="field-tall"
            v-model="injectedFieldType"
            field_label="Field Type"
            field_id="field_type">
          </v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-green ml-2">
        <font-awesome-icon icon="plus"></font-awesome-icon> Create
      </button>
    </template>
  </tooltip-dialog-template>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      injectedFieldType: '',
      formVisible: false
    }
  },
  methods: {
    ...mapActions({
      createInjectedFieldType: 'createInjectedFieldType'
    }),
    resetForm () {
      this.injectedFieldType = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    showForm () {
      this.formVisible = true
    },
    closeForm () {
      this.formVisible = false
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          if (this.injectedFieldType) {
            this.createInjectedFieldType({
              field_type: this.injectedFieldType
            }).then(() => {
              this.closeForm()
              this.resetForm()
            })
          }
        }
      })
    }
  },
  created () {
    this.fetchInjectedFieldTypes()
  }
}
</script>
