<template>
  <button class="btn btn-circle btn-hollow-red" @click="this.runDelete" :disabled="loading">
    <font-awesome-icon v-if="!loading" icon="minus"></font-awesome-icon>
    <font-awesome-icon v-else icon="spinner" pulse></font-awesome-icon>
  </button>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },
  props: {
    field: Object
  },
  computed: {
    ...mapGetters({
      baseBooleanFieldTypes: 'getBaseBooleanFieldTypes',
      baseOptionFieldTypes: 'getBaseOptionFieldTypes',
      baseTextFieldTypes: 'getBaseTextFieldTypes'
    }),
    booleanFieldSelected () {
      return this.baseBooleanFieldTypes.includes(this.field.type)
    },
    optionFieldSelected () {
      return this.baseOptionFieldTypes.includes(this.field.type)
    },
    textFieldSelected () {
      return this.baseTextFieldTypes.includes(this.field.type)
    }
  },
  methods: {
    ...mapActions({
      deleteOptionField: 'deleteOptionField',
      deleteTextField: 'deleteTextField',
      deleteBooleanField: 'deleteBooleanField'
    }),
    ...mapMutations({
      removeFromUsedFields: 'REMOVE_USED_BASE_FIELD'
    }),
    async deleteMethod (id) {
      if (this.optionFieldSelected) {
        await this.deleteOptionField(id)
      } else if (this.textFieldSelected) {
        await this.deleteTextField(id)
      } else if (this.booleanFieldSelected) {
        await this.deleteBooleanField(id)
      }
    },
    async runDelete () {
      this.loading = true
      await this.deleteMethod(this.field.id)
        .then(() => {
          this.removeFromUsedFields(this.field.base_field)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
