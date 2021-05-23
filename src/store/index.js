import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

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
      state.token =''
    }

  },
  actions: {
    login: function({commit},res){
      // console.log('sdsdds');
      // console.log(res);
      commit('LOGIN',res)
    },
    logout: function({commit}, res){
      commit('LOGOUT',res)
    }

  },
  modules: {
  }
})
