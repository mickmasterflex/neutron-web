import allBuyerClients from '@/store/modules/analytics/buyer-stats/clients'
import buyerClient from '@/store/modules/analytics/buyer-stats/client'
import buyerContract from '@/store/modules/analytics/buyer-stats/buyer-contract'
import offerContract from '@/store/modules/analytics/buyer-stats/offer-contract'
import totals from '@/store/modules/analytics/buyer-stats/totals'

const modules = {
  allBuyerClients,
  buyerClient,
  buyerContract,
  offerContract,
  totals
}

export default {
  modules
}
