import axios from '@/axios'

const actions = {
  async fetchAnalyticsStatsCSV ({ commit, getters }, { url, filename }) {
    commit('SET_ANALYTICS_FETCH_CSV_LOADING')
    const dateRange = getters.getAnalyticsDateRangeUrlFormatted
    await axios({
      url: url + '&csv_download=True&' + dateRange,
      responseType: 'blob',
      method: 'GET'
    }).then(response => {
      const linkUrl = window.URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = linkUrl
      link.download = filename + '-' + dateRange
      link.click()
      URL.revokeObjectURL(link.href)
    }).finally(() => {
      commit('RESET_ANALYTICS_FETCH_CSV_LOADING')
    })
  }
}

export default {
  actions
}
