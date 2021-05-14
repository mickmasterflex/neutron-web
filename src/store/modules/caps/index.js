import axios from '@/axios'
import loading from '@/store/modules/caps/loading/'
import dayCaps from '@/store/modules/caps/day/index'
import monthCaps from '@/store/modules/caps/month/index'
import visibility from '@/store/modules/caps/visibility'

const modules = {
  dayCaps,
  monthCaps,
  loading,
  visibility
}

const state = {
  current_caps_parent_type: null,
  current_cap_parent_id: null,
  caps_calendar_endpoint: null,
  caps_calendar_params: ''
  // current_caps_parent_object: {},
}

const getters = {
  getCapsCalendarEndpoint: state => (state.caps_calendar_endpoint ? state.caps_calendar_endpoint + state.caps_calendar_params : null),
  getCurrentCapParentId: state => state.current_cap_parent_id,
  getCurrentCapsParentType: state => state.current_caps_parent_type
  // getCurrentCapsParentObject: state => state.current_caps_parent_object,
}

const actions = {
  async fetchCurrentCaps ({ commit, getters }) {
    commit('SET_CAPS_FETCH_LOADING')
    await axios.get(getters.getCapsCalendarEndpoint)
      .then(response => {
        commit('SET_CURRENT_CAP_PARENT_ID', response.data.parent)
        commit('SET_CURRENT_DAY_CAPS', response.data.day_caps)
        commit('SET_CURRENT_MONTH_CAPS', response.data.month_caps)
      }).finally(() => {
        commit('RESET_CAPS_FETCH_LOADING')
      })
  },
  async capStateReset ({ commit }) {
    commit('RESET_CURRENT_CAP_PARENT_ID')
    commit('RESET_CURRENT_DAY_CAPS')
    commit('RESET_CURRENT_MONTH_CAPS')
    commit('RESET_CURRENT_CAP_MONTH_FORMATS')
    commit('RESET_CAPS_CALENDAR_ENDPOINT')
    commit('RESET_CAPS_CALENDAR_PARAMS')
  },
  async setCapsCalendarEndpoint ({ commit }, parent) {
    await commit('SET_CURRENT_CAP_PARENT_ID', parent.id)
    await commit('SET_CURRENT_CAPS_PARENT_TYPE', parent.type)
    await commit('SET_CAPS_CALENDAR_ENDPOINT')
  }
  // async updateCapsParent ({ commit, getters }) {
  //   const updatedParent = {
  //     buyers: getters.getBuyerById(getters.getCurrentCapParentId),
  //     partners: getters.getPartnerById(getters.getCurrentCapParentId),
  //     'offer-contracts': getters.getOfferById(getters.getCurrentCapParentId),
  //     relations: getters.getContractRelationById(getters.getCurrentCapParentId)
  //   }
  //   const updateMethods = {
  //     buyers: commit('UPDATE_BUYER'),
  //     partners: commit('UPDATE_PARTNER'),
  //     'offer-contracts': commit('UPDATE_OFFER'),
  //     relations: commit('UPDATE_CONTRACT_RELATION')
  //   }
  //   console.log(updateMethods[getters.getCurrentCapsParentType](updatedParent[getters.getCurrentCapsParentType]))
  //   updateMethods[getters.getCurrentCapsParentType](updatedParent[getters.getCurrentCapsParentType])
  // }
}

const mutations = {
  SET_CURRENT_CAPS_PARENT_TYPE: (state, type) => {
    if (['buyers', 'partners', 'offer-contracts', 'relations'].includes(type)) {
      state.current_caps_parent_type = type
    } else {
      throw (new Error('When setting current_caps_parent_type use one of the following [buyers, partners, offer-contracts, relations]'))
    }
  },
  SET_CURRENT_CAP_PARENT_ID: (state, parent) => (state.current_cap_parent_id = parent),
  SET_CAPS_CALENDAR_ENDPOINT: (state) => (state.caps_calendar_endpoint = `/caps-calendar/${state.current_caps_parent_type}/${state.current_cap_parent_id}/`),
  SET_CAPS_CALENDAR_PARAMS: (state, query) => (state.caps_calendar_params = '?months=' + query.months + '&date=' + query.date),
  // SET_CURRENT_CAPS_PARENT_OBJECT: (state, parent) => (state.current_caps_parent_object = parent),
  RESET_CURRENT_CAPS_PARENT_TYPE: (state) => (state.current_caps_parent_type = null),
  RESET_CURRENT_CAP_PARENT_ID: (state) => (state.current_cap_parent_id = null),
  RESET_CAPS_CALENDAR_ENDPOINT: (state) => (state.caps_calendar_endpoint = null),
  RESET_CAPS_CALENDAR_PARAMS: (state) => (state.caps_calendar_params = '')
  // RESET_CURRENT_CAPS_PARENT_OBJECT: (state) => (state.current_caps_parent_object = {})
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
