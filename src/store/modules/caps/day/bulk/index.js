import visibility from './visibility'
import axios from '@/axios'

const modules = {
  visibility
}

const state = {
  bulk_update_day_caps: []
}

const getters = {
  getBulkUpdateDayCaps: state => state.bulk_update_day_caps
}

const actions = {
  async bulkUpdateDayCap ({ commit }, caps) {
    await axios.post('/day-cap-bulk/', caps)
      .then(response => {
        response.data.caps.forEach(cap => {
          commit('UPDATE_DAY_CAP', cap)
        })
        commit('RESET_BULK_UPDATE_DAY_CAPS')
      })
  }
}

const mutations = {
  ADD_DATE_TO_BULK_UPDATE_DAY_CAPS: (state, date) => (state.bulk_update_day_caps.push(date)),
  ADD_DATES_TO_BULK_UPDATE_DAY_CAPS: (state, dates) => (state.bulk_update_day_caps = [...new Set([...state.bulk_update_day_caps, ...dates])]),
  REMOVE_DATES_FROM_BULK_UPDATE_DAY_CAPS: (state, dates) => (state.bulk_update_day_caps = state.bulk_update_day_caps.filter(date => !dates.includes(date))),
  REMOVE_DATE_TO_BULK_UPDATE_DAY_CAPS: (state, date) => (state.bulk_update_day_caps.splice(state.bulk_update_day_caps.indexOf(date), 1)),
  RESET_BULK_UPDATE_DAY_CAPS: (state) => (state.bulk_update_day_caps = [])
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
