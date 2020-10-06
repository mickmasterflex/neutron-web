<template>
  <div class="fields-inline">
    <text-field field_class="field-md" field_disabled="true" v-model="lower_bound"/>
    <text-field field_class="field-md" field_disabled="true" v-model="upper_bound"/>
    <text-field field_class="field-md" field_disabled="true" v-model="payout"/>
  </div>
</template>

<script>
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
  }
}
</script>
