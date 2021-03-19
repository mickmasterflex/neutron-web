import clientStats from './client-stats'
import allClientsStats from './all-clients-stats'
import contractStats from './contract-stats'
import dateRange from './date-range'
import fetchCSV from './fetch-csv'
import leads from './leads'
import leadSearch from './leads/lead-search'
import loading from './loading'
import offerStats from './offer-stats'
import partnerStats from './partner-stats'
import totals from './totals'

const modules = {
  allClientsStats,
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
