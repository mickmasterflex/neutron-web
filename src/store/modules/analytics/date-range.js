import dayjs from 'dayjs'

const state = {
  analytics_start_date: dayjs(),
  analytics_end_date: dayjs()
}

const getters = {
  getAnalyticsFormattedStartDate: (state) => dayjs(state.analytics_start_date).format('YYYY-MM-DD'),
  getAnalyticsFormattedEndDate: (state) => dayjs(state.analytics_end_date).format('YYYY-MM-DD'),
  getAnalyticsDateRangeUrlFormatted: (state, getter) => {
    return `start_date=${getter.getAnalyticsFormattedStartDate}&end_date=${getter.getAnalyticsFormattedEndDate}`
  },
  getAnalyticsDateRange: state => {
    return {
      start: new Date(state.analytics_start_date),
      end: new Date(state.analytics_end_date)
    }
  }
}

const mutations = {
  SET_ANALYTICS_START_DATE: (state, date) => (state.analytics_start_date = date),
  SET_ANALYTICS_END_DATE: (state, date) => (state.analytics_end_date = date)
}

export default {
  state,
  getters,
  mutations
}
