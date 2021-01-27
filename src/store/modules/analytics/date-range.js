const state = {
  analytics_start_date: '2020-1-1',
  analytics_end_date: '2021-2-1'
}

const getters = {
  getAnalyticsDateRangeUrlFormatted: state => {
    return `start_date=${state.analytics_start_date}&end_date=${state.analytics_end_date}`
  },
  getAnalyticsDateRange: state => {
    return `${state.analytics_start_date} - ${state.analytics_end_date}`
  }
}

export default {
  state,
  getters
}
