import dayjs from 'dayjs'

const state = {
  analytics_start_date: dayjs('2020-1-1'),
  analytics_end_date: dayjs('2021-2-1')
}

const getters = {
  getFormattedStartDate: (state) => dayjs(state.analytics_start_date).format('YYYY-MM-DD'),
  getFormattedEndDate: (state) => dayjs(state.analytics_end_date).format('YYYY-MM-DD'),
  getAnalyticsDateRangeUrlFormatted: (state, getter) => {
    return `start_date=${getter.getFormattedStartDate}&end_date=${getter.getFormattedEndDate}`
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
