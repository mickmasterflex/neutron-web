import bulkUpdate from '@/store/modules/contract-relations/bulk-update'
import pricingTierGroups from '@/store/modules/contract-relations/pricing-tier-groups'
import contractRelations from '@/store/modules/contract-relations/contract-relations'
import loading from '@/store/modules/contract-relations/loading'

const modules = {
  bulkUpdate,
  contractRelations,
  loading,
  pricingTierGroups
}

export default {
  modules
}
