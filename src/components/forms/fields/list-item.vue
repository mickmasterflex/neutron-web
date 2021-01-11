<template>
  <div class="fields-inline">
    <text-field-prefixed
      color="blue"
      icon="arrows-alt-v"
      field_disabled="true"
      field_size="field-sm"
      field_wrap_class="field-draggable"
      v-model="this.order"
      :field_id="`fieldOrder_${this.field.id}`"/>
    <text-field field_size="field-sm" :value="this.field.id" field_disabled="true"/>
    <text-field :value="this.field.label" field_disabled="true"/>
    <text-field :value="this.field.mapping" field_disabled="true"/>
    <text-field field_size="field-md" :value="this.field.deliver" field_disabled="true"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'

export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    newOrder: Number
  },
  data () {
    return {
      order: this.field.order
    }
  },
  computed: {
    localField () {
      return {
        order: this.order,
        id: this.field.id,
        label: this.field.label,
        mapping: this.field.mapping,
        deliver: this.field.deliver,
        type: this.field.type,
        form: this.field.form,
        base_field: this.field.base_field
      }
    }
  },
  watch: {
    order () {
      this.update()
    },
    newOrder () {
      this.order = this.newOrder
    }
  },
  methods: {
    ...mapActions({
      updateTextField: 'updateTextField',
      updateOptionField: 'updateOptionField'
    }),
    update () {
      if (this.field.type === 'text' || this.field.type === 'textarea') {
        this.updateTextField(this.localField)
      } else if (this.field.type === 'select' || this.field.type === 'radio') {
        this.updateOptionField(this.localField)
      }
    }
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
