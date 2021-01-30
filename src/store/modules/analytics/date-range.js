const state = {
  analytics_start_date: new Date(),
  analytics_end_date: new Date()
}

const getters = {
  getFormatedDate: () => (date) => {
    // duplicated from src/components/ui/forms/validation-fields/date-picker.vue
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    const year = date.getFullYear()

    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }
    return [year, month, day].join('-')
  },
  getAnalyticsDateRangeUrlFormatted: (state, getter) => {
    return `start_date=${getter.getFormatedDate(state.analytics_start_date)}&end_date=${getter.getFormatedDate(state.analytics_end_date)}`
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
