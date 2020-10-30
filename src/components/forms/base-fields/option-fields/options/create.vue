<template>
  <div class="well">
    <ul class="fields-inline-heading px-1">
      <li class="w-20 fields-inline-heading-item">Order</li>
      <li class="w-64 fields-inline-heading-item">Label</li>
      <li class="w-64 fields-inline-heading-item">Value</li>
    </ul>
    <validation-observer v-slot="{ handleSubmit }" ref="form" class="form-horizontal">
      <form @submit.prevent="handleSubmit(submitCreateForm)" class="flex flex-row items-center justify-between card card-sm">
        <span class="fields-inline">
          <text-field-prefixed
            icon="arrows-alt-v"
            field_disabled="true"
            field_size="field-sm"
            prefix_group_class="field-disabled"
            v-model="order"
            field_id="newOption_order"
          />
          <v-text-field
            v-model="label"
            field_id="newOption_label"
            class="field-error-inside"
            rules="required"/>
          <v-text-field
            v-model="value"
            field_id="newOption_mapping"
            class="field-error-inside"
            rules="required"/>
        </span>
        <button class="btn btn-green btn-circle mx-1" type="submit"><font-awesome-icon icon="plus"></font-awesome-icon></button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'

export default {
  data () {
    return {
      label: '',
      value: ''
    }
  },
  computed: {
    ...mapGetters({
      field: 'getCurrentBaseField',
      options: 'getCurrentBaseOptions'
    }),
    order () {
      return this.options.length + 1
    }
  },
  methods: {
    ...mapActions({
      create: 'createBaseOption'
    }),
    resetForm () {
      this.label = ''
      this.value = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    submitCreateForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.create({
            order: this.order,
            label: this.label,
            value: this.value,
            field: this.field.id
          }).then(() => {
            this.resetForm()
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  },
  destroyed () {
    this.resetForm()
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
