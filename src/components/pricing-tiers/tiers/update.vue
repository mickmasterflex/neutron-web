<template>
  <div class="fields-inline">
    <text-field-prefixed color="none" icon="dollar-sign" field_size="field-md" field_disabled="true" v-model="lower_bound"/>
    <text-field-prefixed color="none" icon="dollar-sign" field_size="field-md" field_disabled="true" v-model="upper_bound"/>
    <text-field-prefixed color="none" icon="dollar-sign" field_size="field-md" field_disabled="true" v-model="payout"/>
  </div>
</template>

<script>
import textFieldPrefixed from '@/components/ui/forms/base-fields/text-field-prefixed'

export default {
  data () {
    return {
      lower_bound: this.pricingTier.lower_bound,
      upper_bound: this.pricingTier.upper_bound,
      payout: this.pricingTier.payout
    }
  },
  props: {
    pricingTier: Object
  },
  components: {
    'text-field-prefixed': textFieldPrefixed
  }
}
</script>
