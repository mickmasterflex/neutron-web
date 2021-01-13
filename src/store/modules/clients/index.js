import axios from '@/axios'
import visibility from '@/store/modules/clients/visibility'
import loading from '@/store/modules/clients/loading'

const modules = {
  loading,
  visibility
}

const state = {
  clients: [],
  current_client: {}
}

const getters = {
  getAllClients: state => state.clients,
  getCurrentClient: state => state.current_client,
  getAllClientsCount: (state) => {
    return state.clients.length
  },
  getClientById: (state) => (clientId) => {
    return state.clients.filter(client => client.id === clientId)[0]
  }
}

const actions = {
  async fetchClients ({ commit }) {
    commit('SET_CLIENTS_FETCH_LOADING')
    await axios.get('/clients/')
      .then(response => {
        commit('SET_CLIENTS', response.data)
      })
      .finally(() => {
        commit('RESET_CLIENTS_FETCH_LOADING')
      })
  },
  async fetchCurrentClient ({ commit }, slug) {
    commit('SET_CLIENT_FETCH_LOADING')
    await axios.get(`/clients/${slug}/`)
      .then(response => {
        commit('SET_CURRENT_CLIENT', response.data)
      })
      .finally(() => {
        commit('RESET_CLIENT_FETCH_LOADING')
      })
  },
  async createClient ({ commit }, client) {
    await axios.post('/clients/', client)
      .then(response => {
        commit('ADD_CLIENT', response.data)
      })
  },
  async updateClient ({ commit }, updatedClient) {
    await axios.put(`/clients/${updatedClient.slug}/`, updatedClient)
      .then(response => {
        commit('UPDATE_CLIENT', response.data)
        commit('SET_CURRENT_CLIENT', response.data)
      })
  },
  async deleteClient ({ commit }, slug) {
    await axios.delete(`/clients/${slug}/`)
      .then(() => {
        commit('REMOVE_CLIENT', slug)
      })
  }
}

const mutations = {
  SET_CLIENTS: (state, clients) => (state.clients = clients),
  SET_CURRENT_CLIENT: (state, client) => (state.current_client = client),
  RESET_CURRENT_CLIENT: (state, client) => (state.current_client = {}),
  ADD_CLIENT: (state, client) => state.clients.unshift(client),
  UPDATE_CLIENT: (state, updatedClient) => {
    const index = state.clients.findIndex(client => client.slug === updatedClient.slug)
    if (index !== -1) {
      state.clients.splice(index, 1, updatedClient)
    }
  },
  REMOVE_CLIENT: (state, slug) => (state.clients = state.clients.filter(client => client.slug !== slug))
}

export default {
  modules,
  state,
  getters,
  actions,
  mutations
}
