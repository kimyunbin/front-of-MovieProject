import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
// import jwt_decode from "jwt-decode";
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: '',
  },
  mutations: {
    LOGIN : function(state, res) {
      const token = res.data.token
      state.token = token
    },
    LOGOUT : function(state) {
      state.token= ''
    }
  },
  actions: {
    login: function({commit},res){
      console.log(res);
      commit('LOGIN',res)
    },
    logout: function({commit}){
      commit('LOGOUT')
    },
  },
  modules: {
  },

})
