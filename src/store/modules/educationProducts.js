import axios from '@/axios'

const state = {
  educationProducts: [],
  current_education_product: {},
  show_create_education_product_modal: false
}

const getters = {
  getCurrentEducationProduct: state => state.current_education_product,
  getEducationProductByCampus: (state) => (campusId) => {
    return state.educationProducts.filter(educationProduct => educationProduct.product_group === campusId)
  },
  getShowCreateEducationProductModal: state => state.show_create_education_product_modal
}

const actions = {
  async fetchEducationProducts ({ commit }) {
    await axios.get('/education-products/')
      .then(response => {
        commit('SET_EDUCATION_PRODUCTS', response.data)
      })
  },
  async fetchCurrentEducationProduct ({ commit }, id) {
    await axios.get(`/education-products/${id}/`)
      .then(response => {
        commit('SET_CURRENT_EDUCATION_PRODUCT', response.data)
      })
  },
  async createEducationProduct ({ commit }, educationProduct) {
    await axios.post('/education-products/', educationProduct)
      .then(response => {
        commit('ADD_EDUCATION_PRODUCT', response.data)
      })
  },
  async updateEducationProduct ({ commit }, updatedEducationProduct) {
    await axios.put(`/education-products/${updatedEducationProduct.id}/`, updatedEducationProduct)
      .then(response => {
        commit('UPDATE_EDUCATION_PRODUCT', response.data)
        commit('SET_CURRENT_EDUCATION_PRODUCT', response.data)
      }).catch(error => {
        window.console.log(error)
      })
  },
  async deleteEducationProduct ({ commit }, id) {
    await axios.delete(`/education-products/${id}/`)
      .then(() => {
        commit('REMOVE_EDUCATION_PRODUCT', id)
      })
  }
}

const mutations = {
  SET_EDUCATION_PRODUCTS: (state, educationProducts) => (state.educationProducts = educationProducts),
  SET_CURRENT_EDUCATION_PRODUCT: (state, educationProduct) => (state.current_education_product = educationProduct),
  ADD_EDUCATION_PRODUCT: (state, educationProduct) => state.educationProducts.unshift(educationProduct),
  UPDATE_EDUCATION_PRODUCT: (state, updatedEducationProduct) => {
    const index = state.educationProducts.findIndex(educationProduct => educationProduct.id === updatedEducationProduct.id)
    if (index !== -1) {
      state.educationProducts.splice(index, 1, updatedEducationProduct)
    }
  },
  REMOVE_EDUCATION_PRODUCT: (state, id) => (state.educationProducts = state.educationProducts.filter(educationProduct => educationProduct.id !== id)),
  SHOW_CREATE_EDUCATION_PRODUCT_MODAL: (state) => (state.show_create_education_product_modal = true),
  CLOSE_CREATE_EDUCATION_PRODUCT_MODAL: (state) => (state.show_create_education_product_modal = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
