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
            v-model="injectedFieldType"
            field_label="Field Type"
            field_id="field_type">
          </v-text-field>
        </form>
      </validation-observer>
    </template>
    <template v-slot:footer-additional>
      <button @click="submitForm()" class="btn btn-green ml-2" :disabled="loading">
        <font-awesome-icon v-if="loading" icon="spinner" pulse></font-awesome-icon>
        <font-awesome-icon v-else icon="plus"></font-awesome-icon> Create
      </button>
    </template>
  </tooltip-dialog-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      injectedFieldType: '',
      formVisible: false
    }
  },
  computed: {
    ...mapGetters({
      loading: 'getInjectedFieldTypesPostLoading'
    })
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
  }
}
</script>
