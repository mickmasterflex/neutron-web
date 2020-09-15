<script>
import { mapActions, mapGetters } from 'vuex'
import { setResponseErrors } from '@/mixins/setResponseErrors'

export default {
  data () {
    return {
      name: ''
    }
  },
  props: {
    pricing_tier_groups: Object
  },
  mixins: [setResponseErrors],
  watch: {
    pricing_tier_groups: function () {
      this.name = this.pricingTierGroups.name
    }
  },
  computed: {
    unsavedChanges () {
      if (this.name) {
        return this.name !== this.pricingTierGroups.name
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      update: 'updatePricingTierGroup'
    }),
    ...mapGetters({
        pricing_tier_groups: 'getCurrentPricingTierGroup'
      })
    },
    submitForm () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.update({
            name: this.name
          }).catch(error => {
            this.error = error
          })
        }
      })
    }
  }
}
</script>
