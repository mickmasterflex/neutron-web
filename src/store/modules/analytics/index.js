import buyerStats from '@/store/modules/analytics/buyer-stats'
import clientStats from '@/store/modules/analytics/client-stats'
import contractStats from '@/store/modules/analytics/contract-stats'
import dateRange from '@/store/modules/analytics/date-range'
import fetchCSV from '@/store/modules/analytics/fetch-csv'
import leads from '@/store/modules/analytics/leads'
import leadSearch from '@/store/modules/analytics/leads/lead-search'
import loading from '@/store/modules/analytics/loading'
import offerStats from '@/store/modules/analytics/offer-stats'
import partnerStats from '@/store/modules/analytics/partner-stats'
import totals from '@/store/modules/analytics/totals'

const modules = {
  buyerStats,
  clientStats,
  contractStats,
  dateRange,
  fetchCSV,
  leads,
  leadSearch,
  loading,
  offerStats,
  partnerStats,
  totals
}

export default {
  modules
}
