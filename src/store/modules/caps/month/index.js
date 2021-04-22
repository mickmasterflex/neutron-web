import axios from '@/axios'
import monthCapModals from '@/store/modules/caps/month/visibility'

const modules = {
  monthCapModals
}

const state = {
  current_month_caps: [],
  current_cap_month_formats: {
    YYYY_MM_DD: 'YYYY_MM_DD',
    MM_YYYY: 'MM_YYYY'
  },
  selected_cap_month: null
}

const getters = {
  getCurrentMonthCaps: state => state.current_month_caps,
  getSelectedCapMonth: state => state.selected_cap_month,
  getCurrentCapMonthFormats: state => state.current_cap_month_formats,
  getMonthCapByCurrentMonthDate: state => {
    if (state.current_month_caps) {
      return state.current_month_caps.find(cap => cap.date === state.current_cap_month_formats.YYYY_MM_DD)
    }
  }
}

const actions = {
  async createMonthCap ({ commit }, cap) {
    commit('SET_CAPS_POST_LOADING')
    await axios.post('/month-cap/', cap)
      .then(response => {
        commit('UPDATE_MONTH_CAP', response.data)
      }).finally(() => {
        commit('RESET_CAPS_POST_LOADING')
      })
  },
  async updateMonthCap ({ commit }, cap) {
    commit('SET_CAPS_PUT_LOADING')
    await axios.put(`/month-cap/${cap.id}/`, cap)
      .then(response => {
        commit('UPDATE_MONTH_CAP', response.data)
      }).finally(() => {
        commit('RESET_CAPS_PUT_LOADING')
      })
  },
  async deleteMonthCap ({ commit }, id) {
    commit('SET_CAPS_DELETE_LOADING')
    await axios.delete(`/month-cap/${id}/`)
      .then(() => {
        commit('CLOSE_UPDATE_MONTH_CAP_MODAL')
        commit('REMOVE_MONTH_CAP', id)
      }).finally(() => {
        commit('RESET_CAPS_DELETE_LOADING')
      })
  }
}

const mutations = {
  SET_CURRENT_MONTH_CAPS: (state, caps) => (state.current_month_caps = caps),
  RESET_CURRENT_MONTH_CAPS: (state) => (state.current_month_caps = []),
  SET_CURRENT_CAP_MONTH_FORMATS: (state, month) => (state.current_cap_month_formats = month),
  RESET_CURRENT_CAP_MONTH_FORMATS: (state) => {
    state.current_cap_month_formats = {
      YYYY_MM_DD: 'YYYY_MM_DD',
      MM_YYYY: 'MM_YYYY'
    }
  },
  SET_SELECTED_CAP_MONTH: (state, month) => (state.selected_cap_month = state.current_month_caps.find(cap => cap.date === month.date)),
  RESET_SELECTED_CAP_MONTH: (state) => (state.selected_cap_month = null),
  UPDATE_MONTH_CAP: (state, updatedCap) => {
    const index = state.current_month_caps.findIndex(cap => cap.date === updatedCap.date)
    if (index !== -1) {
      const capUpdate = state.current_month_caps[index]
      capUpdate.limit = updatedCap.limit
      capUpdate.id = updatedCap.id
      state.current_month_caps.splice(index, 1, capUpdate)
    }
  },
  REMOVE_MONTH_CAP: (state, id) => {
    const index = state.current_month_caps.findIndex(cap => cap.id === id)
    if (index !== -1) {
      const deletedCap = state.current_month_caps[index]
      deletedCap.id = null
      deletedCap.is_capped = false
      deletedCap.limit = null
      state.current_month_caps.splice(index, 1, deletedCap)
    }
  }
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
